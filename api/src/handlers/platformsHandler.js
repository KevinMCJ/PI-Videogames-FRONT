const {
  savePlatformsData,
  getPlatforms,
} = require("../controllers/platformsController");

const getPlatformsHandler = async (req, res) => {
  try {
    await savePlatformsData();
    const platforms = await getPlatforms();
    res.status(201).json(platforms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPlatformsHandler };
