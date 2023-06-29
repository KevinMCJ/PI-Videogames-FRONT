require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");
const {
  apiInfoClean,
  validateArrayWithMinimumLength,
  validateTextWithoutSpecialChars,
  validateDateFormat,
  validateURL,
  validateNumberWithRange,
  validateGenres,
  validatePlatforms,
} = require("../utils/index");
const endpoint = `https://api.rawg.io/api/games`;

const getVideogamesDB = async () => {
  let videogamesDB = await Videogame.findAll({
    include: [
      {
        model: Genre,
        as: "genres",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        as: "platforms",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  // * Transformo la estructura de "genres" y "platforms"
  // * Para que coincida con la de los juegos de la API y sea todo uniforme.
  videogamesDB = videogamesDB.map((game) => ({
    ...game.toJSON(),
    genres: game.genres.map((genre) => genre.name),
    platforms: game.platforms.map((platform) => platform.name),
    origin: "created",
  }));

  return videogamesDB;
};

const getVideogamesAPI = async () => {
  try {
    const promises = [];

    // * Hay 20 videojuegos por pagina, para traer solo 100. Trabajamos con las 5 primeras paginas.
    for (let page = 1; page <= 5; page++) {
      promises.push(axios.get(`${endpoint}?key=${API_KEY}&page=${page}`));
    }

    // * Resuelvo todas las promesas del array responses.
    const responses = await Promise.all(promises);

    const gamesPerPage = responses.map(({ data }) => {
      const cleanPageGames = data.results.map((game) => apiInfoClean(game));
      return cleanPageGames;
    });

    // * Con la funcion flat junto los 20 videojuegos de cada pag en un solo array de objetos.
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

  // ? Que no existan juegos con ese nombre no es un error.
  const allVideogames = await getAllVideogames();
  const filteredGames = allVideogames.filter((game) =>
    game.name.toLowerCase().includes(name)
  );

  return filteredGames;
};

const getVideogameById = async (id) => {
  if (!id) throw Error("Invalid id provided");

  // * Si es numero significa que no es de tipo UUID.
  if (Number(id)) id = parseInt(id);

  const allVideogames = await getAllVideogames();
  const videogame = allVideogames.find((game) => game.id === id);

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

  validateTextWithoutSpecialChars(name, 1, 30, "Name");
  validateDateFormat(released);
  validateURL(image);
  validateNumberWithRange(rating, 1, 5, "Rating");
  // * Valida el formato requerido y longitud minima de lo contrario lanza un Error.
  validateArrayWithMinimumLength(genres, 1);
  validateArrayWithMinimumLength(platforms, 1);

  const genresToAdd = await validateGenres(genres);
  const platformsToAdd = await validatePlatforms(platforms);

  const newVideogame = await Videogame.create({
    name,
    platforms,
    image,
    released,
    rating,
    description,
    genres,
  });

  // * Relacionamos los registros en la tabla de union correspondiente.
  await newVideogame.addGenre(genresToAdd);
  await newVideogame.addPlatform(platformsToAdd);

  return newVideogame;
};

module.exports = {
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  createVideogame,
};
