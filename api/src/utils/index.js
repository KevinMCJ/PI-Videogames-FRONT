const { ValidationError } = require("../errors");

// * EXPRESIONES REGULARES.
const noSpecialCharsRegex = /^[a-zA-Z0-9\s]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // ? YYYY-MM-DD
const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const apiInfoClean = (videogame) => {
  const defaultImageURL = "https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg";
  const defaultArray = ["Unknown"];

  return {
    id: videogame.id,
    name: videogame.name || "???",
    description: videogame.description_raw
      ? videogame.description_raw.split("Español")[0]
      : "No description",
    platforms: videogame.platforms && videogame.platforms.length
      ? videogame.platforms.map(({ platform }) => platform.name)
      : defaultArray,
    image: videogame.background_image || defaultImageURL,
    released: videogame.released || "-",
    rating: videogame.rating || 0,
    genres: videogame.genres && videogame.genres.length
      ? videogame.genres.map((genre) => genre.name)
      : defaultArray,
    origin: "api",
  };
};

// ? Validation Helpers

// * Platforms y Genres tienen que ser arrays y tener al menos un elemento para continuar.
const validateArrayWithMinimumLength = (array, minLength) => {
  if (!Array.isArray(array) || array.length < minLength) {
    throw new ValidationError(`Invalid array or at least ${minLength} element(s) required`);
  }
  return array;
};

const validateTextInRange = (text, minLength, maxLength, strField) => {
  const trimmedText = text.trim();
  if (typeof trimmedText !== "string" || trimmedText.length > maxLength || trimmedText.length < minLength) {
    throw new ValidationError(
      `${strField} must be a string between ${minLength} and ${maxLength} characters long.`
    );
  }
  return trimmedText;
}

const validateTextWithoutSpecialChars = (text, minLength, maxLength, strField) => {
  const validText = validateTextInRange(text, minLength, maxLength, strField);
  if (!noSpecialCharsRegex.test(validText)) {
    throw new ValidationError(`${text} cannot include special characters`);
  }
  return validText;
};

const validateDateFormat = (date) => {
  const trimmedDate = date.trim();
  if (!dateRegex.test(trimmedDate)) {
    throw new ValidationError("Date format must be: YYYY-MM-DD");
  }
  return trimmedDate;
};

const validateURL = (url) => {
  const trimmedUrl = url.trim();
  if (!urlRegex.test(trimmedUrl)) {
    throw new ValidationError("URL must begin with http:// or https://");
  }
  return trimmedUrl;
};

const validateNumberWithRange = (number, min, max, strField) => {
  if (isNaN(number) || number > max || number < min) {
    throw new ValidationError(`${strField} must be a number between ${min} and ${max}`);
  }
  const parsedNumber = Number(parseFloat(number).toFixed(2));

  return parsedNumber;
};

module.exports = {
  apiInfoClean,
  validateArrayWithMinimumLength,
  validateTextInRange,
  validateTextWithoutSpecialChars,
  validateDateFormat,
  validateURL,
  validateNumberWithRange,
};
