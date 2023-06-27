const { Router } = require("express");
const videogamesRouter = Router();
const {
  getVideogamesHandler,
  getVideogameByIdHandler,
  createVideogameHandler,
} = require("../handlers/videogamesHandler");

videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.get("/:id", getVideogameByIdHandler);

videogamesRouter.post("/", createVideogameHandler);

module.exports = videogamesRouter;
