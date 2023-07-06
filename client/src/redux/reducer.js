const {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_VIDEOGAME_BY_ID,
  FILTER_GAMES,
  SORT_BY_NAME,
  SORT_BY_RATING,
  CLEAR_FILTERS,
  CREATE_GAME,
  GET_PLATFORMS,
  GET_GENRES,
  SET_LOADING,
} = require("./actions");

const initialState = {
  isLoading: false,
  allGames: [],
  copyGames: [],
  game: {},
  platforms: [],
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return { ...state, allGames: action.payload, copyGames: action.payload };
    case GET_VIDEOGAMES_BY_NAME:
      return { ...state, copyGames: action.payload };
    case GET_VIDEOGAME_BY_ID:
      return { ...state, game: action.payload };
    case FILTER_GAMES:
      const { selectedGenres, selectedOrigin } = action.payload;

      /*
       * Filtrado: Todos los juegos que incluyan TODOS los generos de seleccionados
       * Y su origen también coincida lo seleccionado por el usuario. Por defecto = all */
      const filteredGames = state.allGames.filter(
        (game) =>
          selectedGenres.every((genre) => game.genres.includes(genre)) &&
          (selectedOrigin === "all" || game.origin === selectedOrigin)
      );
      return { ...state, copyGames: filteredGames };
    case SORT_BY_NAME:
      const sortedGamesByName = [...state.copyGames];

      // * str1.localCompare(str2) retorna negativo/positivo o 0. Comparando alfabeticamente 2 cadenas a b.
      if (action.payload === "asc") {
        sortedGamesByName.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "desc") {
        sortedGamesByName.sort((a, b) => b.name.localeCompare(a.name));
      }

      return { ...state, copyGames: sortedGamesByName };
    case SORT_BY_RATING:
      const sortedGamesByRating = [...state.copyGames];

      // * EJ - B=5 A=4 , 5 - 4 = 1 (positivo) , entonces el sort coloca a b antes que a.
      if (action.payload === "highest") {
        sortedGamesByRating.sort((a, b) => b.rating - a.rating);
      } else if (action.payload === "lowest") {
        sortedGamesByRating.sort((a, b) => a.rating - b.rating);
      }

      return { ...state, copyGames: sortedGamesByRating };
    case CREATE_GAME:
      const updatedGames = [...state.allGames, action.payload];
      return {
        ...state,
        allGames: updatedGames,
        copyGames: updatedGames,
      };
    case GET_PLATFORMS:
      return { ...state, platforms: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case CLEAR_FILTERS:
      return { ...state, copyGames: state.allGames };
    default:
      return { ...state };
  }
};

export default rootReducer;
