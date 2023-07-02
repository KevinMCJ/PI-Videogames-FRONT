const { Genre, Platform } = require("../db");

// * EXPRESIONES REGULARES.
const noSpecialCharsRegex = /^[a-zA-Z0-9\s]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // ? YYYY-MM-DD
const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const apiInfoClean = (videogame) => {
  return {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description
      ? videogame.description
      : "No description",
    platforms: videogame.platforms.map(({ platform }) => platform.name),
    image: videogame.background_image,
    released: videogame.released,
    rating: videogame.rating,
    genres: videogame.genres.map((genre) => genre.name),
    origin: "api",
  };
};

// ? Validation Helpers

// * Platforms y Genres tienen que ser arrays y tener al menos un elemento para continuar.
const validateArrayWithMinimumLength = (array, minLength) => {
  if (!Array.isArray(array) || array.length < minLength) {
    throw Error(`Invalid format or at least ${minLength} element(s) required`);
  }
};

const validateTextWithoutSpecialChars = (
  text,
  minLength,
  maxLength,
  strField
) => {
  if (!noSpecialCharsRegex.test(text)) {
    throw Error(`${text} cannot include special characters`);
  }
  if (text.length > maxLength || text.length < minLength) {
    throw Error(
      `${strField} must be between ${minLength} and ${maxLength} characters long.`
    );
  }
};

const validateDateFormat = (date) => {
  if (!dateRegex.test(date)) {
    throw Error("Date format must be: YYYY-MM-DD");
  }
};

const validateURL = (url) => {
  if (!urlRegex.test(url)) {
    throw Error("URL must begin with http:// or https://");
  }
};

const validateNumberWithRange = (number, min, max, strField) => {
  if (!Number(number) || number > max || number < min) {
    throw Error(`${strField} be a number between ${min} and ${max}`);
  }
};

// * Valida que existan instancias que coincidan con TODAS las recibidas.
const validateGenres = async (genres) => {
  const genresToAdd = await Genre.findAll({
    where: { name: genres },
  });

  if (!genresToAdd || genresToAdd.length !== genres.length) {
    throw Error("One or more non-existent genres");
  }

  return genresToAdd;
};

const validatePlatforms = async (platforms) => {
  const platformsToAdd = await Platform.findAll({
    where: { name: platforms },
  });

  if (!platformsToAdd || platformsToAdd.length !== platforms.length) {
    throw Error("One or more non-existent platforms");
  }

  return platformsToAdd;
};

module.exports = {
  apiInfoClean,
  validateArrayWithMinimumLength,
  validateTextWithoutSpecialChars,
  validateDateFormat,
  validateURL,
  validateNumberWithRange,
  validateGenres,
  validatePlatforms,
};
