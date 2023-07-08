const { Router } = require("express");
const videogamesRouter = Router();
const {
  getVideogamesHandler,
  getVideogameByIdHandler,
  createVideogameHandler,
  modifyVideogameHandler,
  deleteVideogameHandler
} = require("../handlers/videogamesHandler");

videogamesRouter.get("/", getVideogamesHandler);
videogamesRouter.get("/:id", getVideogameByIdHandler);

videogamesRouter.post("/", createVideogameHandler);
videogamesRouter.put("/:id", modifyVideogameHandler);
videogamesRouter.delete("/:id", deleteVideogameHandler);

module.exports = videogamesRouter;
