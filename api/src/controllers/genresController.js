require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre, Videogame } = require("../db");
const endpoint = `https://api.rawg.io/api/genres`;

const saveGenresData = async () => {
  try {
    const dbLength = await Genre.count();

    // * Para cargar la BDD solo una vez.
    if (dbLength === 0) {
      const { data } = await axios.get(`${endpoint}?key=${API_KEY}`);

      if (!data) throw Error("Couldn't get data from API");

      const allGenres = data.results.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      });

      await Genre.bulkCreate(allGenres);
    }
  } catch (error) {
    throw Error(`Error saving the genres in the database: ${error.message}`);
  }
};

const getGenres = async () => {
  let allGenres = await Genre.findAll({
    include: {
      model: Videogame,
      as: "games",
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  allGenres = allGenres.map((genre) => ({
    ...genre.toJSON(),
    games: genre.games.map((game) => game.name),
  }));

  return allGenres;
};

module.exports = { saveGenresData, getGenres };
