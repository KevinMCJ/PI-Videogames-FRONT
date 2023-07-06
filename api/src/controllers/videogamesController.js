require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { Videogame } = require("../db");
const {
  apiInfoClean,
  validateArrayWithMinimumLength,
  validateTextInRange,
  validateTextWithoutSpecialChars,
  validateDateFormat,
  validateURL,
  validateNumberWithRange,
} = require("../utils/index");
const {
  sequelizeGameConfig,
  formatDBVideoGame,
  validateUniqueGame,
  validateGenres,
  validatePlatforms,
} = require("../utils/dbHelpers");
const endpoint = `https://api.rawg.io/api/games`;

const getVideogamesDB = async () => {
  // * Si no encuentra instancias retorna un array vacio.
  const videogamesDB = await Videogame.findAll(sequelizeGameConfig);
  const cleanGamesDB = videogamesDB.map((game) => formatDBVideoGame(game.dataValues));
  return cleanGamesDB;
};

const getVideogamesAPI = async () => {
  try { // * Para ponerle un mensaje mas descriptivo si el Promise.all lanza una excepcion.
    const promises = [];

    // ? Hay 20 videojuegos por pagina, para traer solo 100. Trabajamos con las 5 primeras paginas.
    for (let page = 1; page <= 5; page++) {
      promises.push(axios.get(`${endpoint}?key=${API_KEY}&page=${page}`));
    }

    const responses = await Promise.all(promises);
    // ? GamesPerPage : Array de arrays cada uno con 20 games [objetos] dentro, mapeo la info de estos.
    const gamesPerPage = responses.map(({ data }) => {
      const cleanPageGames = data.results.map((game) => apiInfoClean(game));
      return cleanPageGames;
    });
    // * Con el metodo flat se convierte en un solo array de objetos.
    const allGamesApi = gamesPerPage.flat();

    return allGamesApi;
  } catch (error) {
    throw Error(`Error getting games from API: ${error.message}`);
  }
};

const getAllVideogames = async () => {
  const apiVideogames = await getVideogamesAPI();
  const dbVideogames = await getVideogamesDB();
  return [...apiVideogames, ...dbVideogames];
};

const getVideogamesByName = async (name) => {
  if (!name || typeof name !== "string") throw Error("No name provided");

  name = name.trim().toLowerCase();
  const resultsPerPage = 15;

  const { data }  = await axios.get(`${endpoint}?key=${API_KEY}&search=${name}&page_size=${resultsPerPage}`);
  const cleanGamesAPI = data.results.map((game) => apiInfoClean(game));
  const gamesDB = await Videogame.findAll({
    ...sequelizeGameConfig,
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  const cleanGamesDB = gamesDB.map((game) => formatDBVideoGame(game.dataValues));

  return [...cleanGamesAPI, ...cleanGamesDB];
};

const getVideogameById = async (id) => {
  if (!id) throw Error("Invalid id provided");
  let videogame;

  // ? Integer => API | Alphanumeric => DB
  if (Number.isInteger(+id)) {
    const { data } = await axios.get(`${endpoint}/${id}?key=${API_KEY}`);
    if (data) videogame = apiInfoClean(data);
  } else {
    videogame = await Videogame.findByPk(id, sequelizeGameConfig);
    if (videogame) videogame = formatDBVideoGame(videogame.dataValues);
  }

  if (!videogame) throw Error("Videogame with the id " + id + " not found");

  return videogame;
};

const createVideogame = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genres
) => {
  if (
    !name ||
    !description ||
    !platforms ||
    !image ||
    !released ||
    !rating ||
    !genres
  ) {
    throw Error("Required data missing");
  }

  // ? Validaciones que lanzan su propio error.
  validateTextWithoutSpecialChars(name, 1, 30, "Name");
  await validateUniqueGame(name);
  validateDateFormat(released);
  validateURL(image);
  validateNumberWithRange(rating, 1, 5, "Rating");
  validateTextInRange(description, 10, 2000, "Description");
  validateArrayWithMinimumLength(genres, 1);
  validateArrayWithMinimumLength(platforms, 1);
  const genresToAdd = await validateGenres(genres);
  const platformsToAdd = await validatePlatforms(platforms);

  // ? Si no lanzo excepciones hasta aca, entonces los datos son validos.
  // * Creamos la instancia y relacionamos los registros en la tabla de union correspondiente.
  const ratingNumber = Number(parseFloat(rating).toFixed(2));
  const newVideogame = await Videogame.create({
    name: name.trim(),
    image: image.trim(),
    released: released.trim(),
    rating: ratingNumber,
    description: description.trim(),
  });
  await newVideogame.addGenre(genresToAdd);
  await newVideogame.addPlatform(platformsToAdd);

  return {...newVideogame.dataValues, genres, platforms, origin: "created"};
};

module.exports = {
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  createVideogame,
};
