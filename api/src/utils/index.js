const apiInfoClean = (videogame) => {
  return {
    id: videogame.id,
    name: videogame.name,
    description: videogame.description
      ? videogame.description
      : "No description",
    platforms: videogame.platforms.map(({platform}) => platform.name),
    image: videogame.background_image,
    released: videogame.released,
    rating: videogame.rating,
    genres: videogame.genres.map((genre) => genre.name),
    origin: "api",
  };
};

module.exports = { apiInfoClean };
