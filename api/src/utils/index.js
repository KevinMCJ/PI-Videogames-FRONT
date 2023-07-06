// * EXPRESIONES REGULARES.
const noSpecialCharsRegex = /^[a-zA-Z0-9\s]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // ? YYYY-MM-DD
const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const apiInfoClean = (videogame) => {
  const defaultImageURL = "https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg";

  return {
    id: videogame.id,
    name: videogame.name || "???",
    description: videogame.description_raw
      ? videogame.description_raw.split("Español")[0]
      : "No description",
    platforms: videogame.platforms?.map(({ platform }) => platform.name) || ["Unknown"],
    image: videogame.background_image || defaultImageURL,
    released: videogame.released || "-",
    rating: videogame.rating || 0,
    genres: videogame.genres?.map((genre) => genre.name) || ["Unknown"],
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

const validateTextInRage = (text, minLength, maxLength, strField) => {
  if (text.trim().length > maxLength || text.trim().length < minLength) {
    throw Error(
      `${strField} must be between ${minLength} and ${maxLength} characters long.`
    );
  }
}

const validateTextWithoutSpecialChars = (text, minLength, maxLength, strField) => {
  if (!noSpecialCharsRegex.test(text.trim())) {
    throw Error(`${text} cannot include special characters`);
  }
  validateTextInRage(text, minLength, maxLength, strField);
};

const validateDateFormat = (date) => {
  if (!dateRegex.test(date.trim())) {
    throw Error("Date format must be: YYYY-MM-DD");
  }
};

const validateURL = (url) => {
  if (!urlRegex.test(url.trim())) {
    throw Error("URL must begin with http:// or https://");
  }
};

const validateNumberWithRange = (number, min, max, strField) => {
  if (isNaN(number) || number > max || number < min) {
    throw Error(`${strField} be a number between ${min} and ${max}`);
  }
};

module.exports = {
  apiInfoClean,
  validateArrayWithMinimumLength,
  validateTextInRage,
  validateTextWithoutSpecialChars,
  validateDateFormat,
  validateURL,
  validateNumberWithRange,
};
