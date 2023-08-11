require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { Videogame } = require("../db");
const { ValidationError, ApiError } = require("../errors");
const { apiInfoClean } = require("../utils/index");
const {
  sequelizeGameConfig,
  formatDBVideoGame,
  validateDBGenres,
  validateDBPlatforms,
  validateVideogameFields,
} = require("../utils/dbHelpers");
const endpoint = `https://api.rawg.io/api/games`;

const getVideogamesDB = async () => {
  // * Si no encuentra instancias retorna un array vacio.
  const videogamesDB = await Videogame.findAll(sequelizeGameConfig);
  const cleanGamesDB = videogamesDB.map((game) =>
    formatDBVideoGame(game.dataValues)
  );
  return cleanGamesDB;
};

const getVideogamesAPI = async () => {
  try {
    // * Para ponerle un mensaje mas descriptivo si el Promise.all lanza una excepcion.
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
    throw new ApiError("Couldn't get games from API");
  }
};

const getAllVideogames = async () => {
  const apiVideogames = await getVideogamesAPI();
  const dbVideogames = await getVideogamesDB();
  return [...apiVideogames, ...dbVideogames];
};

const getVideogamesByName = async (name) => {
  if (!name || typeof name !== "string") throw new ValidationError("No name provided");

  name = name.trim().toLowerCase();
  const resultsPerPage = 15;

  const { data } = await axios.get(
    `${endpoint}?key=${API_KEY}&search=${name}&page_size=${resultsPerPage}`
  );
  const cleanGamesAPI = data.results.map((game) => apiInfoClean(game));
  const gamesDB = await Videogame.findAll({
    ...sequelizeGameConfig,
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  const cleanGamesDB = gamesDB.map((game) =>
    formatDBVideoGame(game.dataValues)
  );

  return [...cleanGamesAPI, ...cleanGamesDB];
};

const getVideogameById = async (id) => {
  if (!id) throw new ValidationError("Invalid id provided");
  let videogame;

  // ? Integer => API | Alphanumeric => DB
  if (Number.isInteger(+id)) {
    const { data } = await axios.get(`${endpoint}/${id}?key=${API_KEY}`);
    if (data) videogame = apiInfoClean(data);
  } else {
    videogame = await Videogame.findByPk(id, sequelizeGameConfig);
    if (videogame) videogame = formatDBVideoGame(videogame.dataValues);
  }

  if (!videogame) throw new ValidationError("Videogame with the id " + id + " not found");

  return videogame;
};

const getVideogameDB = async (id) => {
  if (!id) throw new ValidationError("Invalid id provided");

  const videogame = await Videogame.findOne({ where: { id: id } });

  if (!videogame) throw new ValidationError("Created videogame not found");

  return videogame;
};

const createVideogame = async (name, description, platforms, image, released, rating, genres) => {
  const validVideogame = validateVideogameFields(
    name,
    description,
    platforms,
    image,
    released,
    rating,
    genres
  );
  const genresToAdd = await validateDBGenres(genres);
  const platformsToAdd = await validateDBPlatforms(platforms);

  // ? Si no lanzo excepciones hasta aca, entonces los datos son validos.
  // * Creamos la instancia y relacionamos los registros en la tabla de union correspondiente.
  const newVideogame = await Videogame.create(validVideogame);
  await newVideogame.addGenre(genresToAdd);
  await newVideogame.addPlatform(platformsToAdd);

  return {...validVideogame, origin: "created" };
};

const modifyVideogame = async ({ id, name, description, platforms, image, released, rating, genres }) => {
  const gameToModify = await getVideogameDB(id);
  const validFields = validateVideogameFields(name, description, platforms, image, released, rating, genres);
  const newGenres = await validateDBGenres(genres);
  const newPlatforms = await validateDBPlatforms(platforms);
  
  // * Actualizo los generos y plataformas relacionadas.
  await gameToModify.update(validFields);
  await gameToModify.setGenres(newGenres);
  await gameToModify.setPlatforms(newPlatforms);

  return {id, ...validFields, origin: "created"};
};

const deleteVideogame = async (id) => {
  const gameToDelete = await getVideogameDB(id);
  const deletedGame = gameToDelete.dataValues;
  await gameToDelete.removeGenres();
  await gameToDelete.removePlatforms();
  await gameToDelete.destroy();
  return {id, ...deletedGame, origin: "created"};
}

module.exports = {
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  getVideogameDB,
  createVideogame,
  modifyVideogame,
  deleteVideogame,
};
