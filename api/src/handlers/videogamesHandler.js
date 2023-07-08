const {
  getAllVideogames,
  getVideogamesByName,
  getVideogameById,
  createVideogame,
  modifyVideogame,
  deleteVideogame
} = require("../controllers/videogamesController");

const getVideogamesHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const allVideogames = name
      ? await getVideogamesByName(name)
      : await getAllVideogames();
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

const getVideogameByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const videogame = await getVideogameById(id);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
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
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

const modifyVideogameHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newGameValues = req.body;
    const modifiedGame = await modifyVideogame({id, ...newGameValues});
    res.status(200).json({modifiedGame});
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
}

const deleteVideogameHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGame = await deleteVideogame(id);
    res.status(200).json({deletedGame});
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
}

module.exports = {
  getVideogamesHandler,
  getVideogameByIdHandler,
  createVideogameHandler,
  modifyVideogameHandler,
  deleteVideogameHandler,
};
