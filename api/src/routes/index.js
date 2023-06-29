const { Router } = require("express");
const videogamesRouter = require("./videogamesRouter");
const genresRouter = require("./genresRouter");
const platformsRouter = require("./platformsRouter");
const mainRouter = Router();

mainRouter.use("/videogames", videogamesRouter);
mainRouter.use("/genres", genresRouter);
mainRouter.use("/platforms", platformsRouter);

module.exports = mainRouter;
