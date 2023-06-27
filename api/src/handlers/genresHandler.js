const {
  saveGenresData,
  getGenres,
} = require("../controllers/genresController");

const getGenresHandler = async (req, res) => {
  try {
    await saveGenresData();
    const genres = await getGenres();
    res.status(201).json(genres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getGenresHandler };
