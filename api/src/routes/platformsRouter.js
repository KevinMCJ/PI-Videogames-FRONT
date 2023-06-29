const { Router } = require("express");
const platformsRouter = Router();
const { getPlatformsHandler } = require("../handlers/platformsHandler");

platformsRouter.get("/", getPlatformsHandler);

module.exports = platformsRouter;
