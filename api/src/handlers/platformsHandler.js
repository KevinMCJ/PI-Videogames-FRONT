const {
  savePlatformsData,
  getPlatforms,
} = require("../controllers/platformsController");

const getPlatformsHandler = async (req, res) => {
  try {
    await savePlatformsData();
    const platforms = await getPlatforms();
    res.status(200).json(platforms);
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

module.exports = { getPlatformsHandler };
