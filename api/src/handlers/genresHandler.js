const {
  saveGenresData,
  getGenres,
} = require("../controllers/genresController");

const getGenresHandler = async (req, res) => {
  try {
    await saveGenresData();
    const genres = await getGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

module.exports = { getGenresHandler };
