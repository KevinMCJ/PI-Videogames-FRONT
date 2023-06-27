const {
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  createVideogame,
} = require("../controllers/videogamesController");

const getVideogamesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const allVideogames = name
      ? await getVideogamesByName(name)
      : await getAllVideogames();
    res.status(201).json(allVideogames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVideogameByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const videogame = await getVideogameById(id);
    res.status(201).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createVideogameHandler = async (req, res) => {
  try {
    const { name, description, platforms, image, released, rating, genres } = req.body;
    const newVideogame = await createVideogame(
      name,
      description,
      platforms,
      image,
      released,
      rating,
      genres
    );
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVideogamesHandler,
  getVideogameByIdHandler,
  createVideogameHandler,
};
