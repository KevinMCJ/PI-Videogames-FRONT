// * EXPRESIONES REGULARES.
const nameRegex = /^[a-zA-Z0-9\s]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // ? YYYY-MM-DD
const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const formValidator = (formData) => {
  const errors = {};
  const trimmedFormData = {
    name: formData.name.trim(),
    rating: formData.rating,
    released: formData.released.trim(),
    image: formData.image.trim(),
    description: formData.description.trim(),
    platforms: formData.platforms,
    genres: formData.genres,
  };

  // * Name
  if (!trimmedFormData.name) {
    errors.name = "Name required";
  } else if (!nameRegex.test(trimmedFormData.name)) {
    errors.name = "The name cannot include special characters";
  } else if (trimmedFormData.name.length > 30) {
    errors.name = "Cannot exceed 30 characters";
  }

  // * Rating
  if (!trimmedFormData.rating) {
    errors.rating = "Rating required";
  } else if (isNaN(trimmedFormData.rating)) {
    errors.rating = "Must be a number: Integer or floating point";
  } else if (trimmedFormData.rating < 1 || trimmedFormData.rating > 5) {
    errors.rating = "Rating must be between 1 and 5";
  }

  // * Release Date
  if (!trimmedFormData.released) {
    errors.released = "Release Date required";
  } else if (!dateRegex.test(trimmedFormData.released)) {
    errors.released = "Must be in date format: YYYY-MM-DD";
  }

  // * Image
  if (!trimmedFormData.image) {
    errors.image = "URL of an image required";
  } else if (!urlRegex.test(trimmedFormData.image)) {
    errors.image = "Not a URL";
  }

  // * Description
  if (!trimmedFormData.description) {
    errors.description = "Description required";
  } else if (
    trimmedFormData.description.length > 2000 ||
    trimmedFormData.description.length < 10
  ) {
    errors.description = "Must be between 10 and 2000 characters long";
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
