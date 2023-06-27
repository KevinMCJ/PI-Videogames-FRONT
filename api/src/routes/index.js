const { Router } = require("express");
const videogamesRouter = require("./videogamesRouter");
const genresRouter = require("./genresRouter");
const mainRouter = Router();

mainRouter.use("/videogames", videogamesRouter);
mainRouter.use("/genres", genresRouter);

module.exports = mainRouter;
