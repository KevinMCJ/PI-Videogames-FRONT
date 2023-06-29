require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db");
const { apiInfoClean } = require("../utils/index");
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
    ],
  });

  // * Transformo la estructura de "genres"
  videogamesDB = videogamesDB.map((game) => ({
    ...game.toJSON(),
    genres: game.genres.map((genre) => genre.name),
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

  // * Que no existan juegos con ese nombre no es un error.
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

// ! Agregar mas validaciones para recibir bien los datos, es importante aunque en el front ya las tengamos.
// ! NO OLVIDAR VALIDACIONES FIJARSE CUAL ES EL MAXIMO RATING, QUE SEA FECHA REALEASED ETC.
const createVideogame = async (
  name,
  description,
  platforms,
  image,
  released,
  rating,
  genres
) => {
  if (!name || !description || !platforms || !image || !released || !rating) {
    throw Error("Required data missing");
  }
  // * Platforms y Genres tienen que ser arrays y tener al menos un elemento para continuar.
  if (!Array.isArray(platforms) || platforms.length < 1)
    throw Error("Invalid format or at least one platform is required");

  if (!Array.isArray(genres) || genres.length < 1)
    throw Error("Invalid format or at least one gender is required.");

  const genresToAdd = await Genre.findAll({
    where: { name: genres },
  });

  if (!genresToAdd || genresToAdd.length !== genres.length)
    throw Error("One or more non-existent genres");

  const newVideogame = await Videogame.create({
    name,
    description,
    platforms,
    image,
    released,
    rating,
  });

  await newVideogame.addGenre(genresToAdd);

  return newVideogame;
};

module.exports = {
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  createVideogame,
};
