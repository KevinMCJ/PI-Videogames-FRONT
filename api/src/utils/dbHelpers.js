const { Videogame, Genre, Platform } = require("../db");
const { ValidationError } = require("../errors");
const {
  validateArrayWithMinimumLength,
  validateTextInRange,
  validateTextWithoutSpecialChars,
  validateDateFormat,
  validateURL,
  validateNumberWithRange,
} = require("./index");

const sequelizeGameConfig = {
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
};

// * Transformo la estructura de "genres" y "platforms"
// * Para que coincida con la de los juegos de la API y sea todo uniforme.
const formatDBVideoGame = (game) => {
  return {
    ...game,
    genres: game.genres.map((genre) => genre.name),
    platforms: game.platforms.map((platform) => platform.name),
    origin: "created",
  };
};

// ? Verificar si ya existe una instancia con el mismo nombre
const validateUniqueGame = async (name) => {
  const validName = validateTextWithoutSpecialChars(name, 1, 30, "Name");
  const existingVideogame = await Videogame.findOne({
    where: {
      name: validName,
    },
  });

  if(existingVideogame){
    throw new ConflictError("A videogame with this name already exists. Please choose a different name.", );
  }
};

// ? Validan que existan instancias que coincidan con TODAS las recibidas.
const validateDBGenres = async (genres) => {
  const validGenres = validateArrayWithMinimumLength(genres, 1);
  const genresToAdd = await Genre.findAll({
    where: { name: validGenres },
  });

  if (!genresToAdd || genresToAdd.length !== validGenres.length) {
    throw new ValidationError("One or more non-existent genres");
  }

  return genresToAdd;
};

const validateDBPlatforms = async (platforms) => {
  const validPlatforms = validateArrayWithMinimumLength(platforms, 1);
  const platformsToAdd = await Platform.findAll({
    where: { name: validPlatforms },
  });

  if (!platformsToAdd || platformsToAdd.length !== platforms.length) {
    throw new ValidationError("One or more non-existent platforms");
  }

  return platformsToAdd;
};

const validateVideogameFields = (name, description, platforms, image, released, rating, genres) => {
  if (!name || !description || !platforms || !image || !released || !rating || !genres) {
    throw new ValidationError("Required data missing");
  }

  const validVideoGame = {
    name: validateTextWithoutSpecialChars(name, 1, 30, "Name"),
    released: validateDateFormat(released),
    image: validateURL(image),
    rating: validateNumberWithRange(rating, 1, 5, "Rating"),
    description: validateTextInRange(description, 10, 2000, "Description"),
    genres: validateArrayWithMinimumLength(genres, 1),
    platforms: validateArrayWithMinimumLength(platforms, 1),
  }

  return validVideoGame;
};

module.exports = {
  sequelizeGameConfig,
  formatDBVideoGame,
  validateVideogameFields,
  validateUniqueGame,
  validateDBGenres,
  validateDBPlatforms,
};
