require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Platform, Videogame } = require("../db");
const endpoint = `https://api.rawg.io/api/platforms`;

const savePlatformsData = async () => {
  try {
    const dbLength = await Platform.count();

    // * Para cargar la BDD solo una vez.
    if (dbLength === 0) {
      const { data } = await axios.get(`${endpoint}?key=${API_KEY}`);

      if (!data) throw Error("Couldn't get data from API");

      const allPlatforms = data.results.map((platform) => {
        return {
          id: platform.id,
          name: platform.name,
        };
      });

      await Platform.bulkCreate(allPlatforms);
    }
  } catch (error) {
    throw Error(`Error saving the Platforms in the database: ${error.message}`);
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
    ...platform.toJSON(),
    games: platform.games.map((game) => game.name),
  }));

  return allPlatforms;
};

module.exports = { savePlatformsData, getPlatforms };
