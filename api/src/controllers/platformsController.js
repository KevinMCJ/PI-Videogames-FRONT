require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Platform, Videogame } = require("../db");
const { ApiError, DataBaseError }= require("../errors");
const endpoint = `https://api.rawg.io/api/platforms`;

const savePlatformsData = async () => {
  try {
    const dbLength = await Platform.count();

    // * Para cargar la BDD solo una vez.
    if (dbLength === 0) {
      const { data } = await axios.get(`${endpoint}?key=${API_KEY}`);

      if (!data) throw new ApiError("Couldn't get platforms from API");

      const allPlatforms = data.results.map((platform) => {
        return {
          id: platform.id,
          name: platform.name,
        };
      });

      await Platform.bulkCreate(allPlatforms);
    }
  } catch (error) {
    throw new DataBaseError("Couldn't save platforms in DB");
  }
};

const getPlatforms = async () => {
  let allPlatforms = await Platform.findAll({
    include: {
      model: Videogame,
      as: "games",
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  allPlatforms = allPlatforms.map((platform) => ({
    ...platform.dataValues,
    games: platform.games.map((game) => game.name),
  }));

  return allPlatforms;
};

module.exports = { savePlatformsData, getPlatforms };
