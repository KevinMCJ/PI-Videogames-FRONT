// * EXPRESIONES REGULARES.
const nameRegex = /^[a-zA-Z0-9\s]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // ? YYYY-MM-DD
const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const formValidator = (formData) => {
  const errors = {};

  // * Name
  if (!formData.name.trim()) {
    errors.name = "Name required";
  } else if (!nameRegex.test(formData.name)) {
    errors.name = "The name cannot include special characters";
  } else if (formData.name.length > 30) {
    errors.name = "Cannot exceed 30 characters";
  }

  // * Rating
  if (!formData.rating.trim()) {
    errors.rating = "Rating required";
  } else if (!Number(formData.rating)) {
    errors.rating = "Rating must be a number: Integer or floating point";
  } else if (formData.rating < 1 || formData.rating > 5) {
    errors.rating = "Rating must be between 1 and 5";
  }

  // * Release Date
  if (!formData.released.trim()) {
    errors.released = "Release Date required";
  } else if (!dateRegex.test(formData.released)) {
    errors.released = "Must be in date format: YYYY-MM-DD";
  }

  // * Image
  if (!formData.image.trim()) {
    errors.image = "URL of an image required";
  } else if (!urlRegex.test(formData.image)) {
    errors.image = "Not a URL";
  }

  // * Description
  if (!formData.description.trim()) {
    errors.description = "Description required";
  }

  // * Platforms
  if (!formData.platforms.length) {
    errors.platforms = "Need at least one platform";
  }

  // * Genres
  if (!formData.genres.length) {
    errors.genres = "Need at least one genre";
  }

  return errors;
};

export default formValidator;
