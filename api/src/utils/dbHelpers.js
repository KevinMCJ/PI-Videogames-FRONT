const { Genre, Platform } = require("../db");

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

// ? Validan que existan instancias que coincidan con TODAS las recibidas.
const validateGenres = async (genres) => {
  const genresToAdd = await Genre.findAll({
    where: { name: genres },
  });

  if (!genresToAdd || genresToAdd.length !== genres.length) {
    throw Error("One or more non-existent genres");
  }

  return genresToAdd;
};

const validatePlatforms = async (platforms) => {
  const platformsToAdd = await Platform.findAll({
    where: { name: platforms },
  });

  if (!platformsToAdd || platformsToAdd.length !== platforms.length) {
    throw Error("One or more non-existent platforms");
  }

  return platformsToAdd;
};

module.exports = {
  sequelizeGameConfig,
  formatDBVideoGame,
  validateGenres,
  validatePlatforms,
};
