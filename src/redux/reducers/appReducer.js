import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_VIDEOGAME_BY_ID,
  FILTER_GAMES,
  SORT_BY_NAME,
  SORT_BY_RATING,
  CLEAR_FILTERS,
  CREATE_GAME,
  EDIT_GAME,
  DELETE_GAME,
  GET_PLATFORMS,
  GET_GENRES,
  SET_LOADING,
  SET_GAME,
} from '../actions/appActions';

const initialState = {
  isLoading: false,
  allGames: [],
  copyGames: [],
  game: {},
  platforms: [],
  genres: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return { ...state, allGames: action.payload, copyGames: action.payload };
    case GET_VIDEOGAMES_BY_NAME:
      return { ...state, copyGames: action.payload };
    case GET_VIDEOGAME_BY_ID:
      return { ...state, game: action.payload };
    case SET_GAME:
      return { ...state, game: action.payload };
    case FILTER_GAMES:
      const { selectedGenres } = action.payload;

      /*
       * Filtrado: Todos los juegos que incluyan TODOS los generos de seleccionados
       * Y su origen también coincida lo seleccionado por el usuario. Por defecto = all */
      const filteredGames = state.allGames.filter((game) => {
        const mappedGenresNames = game.genres.map((g) => g.name);
        return selectedGenres.every((genre) =>
          mappedGenresNames.includes(genre)
        );
      });
      return { ...state, copyGames: filteredGames };
    case SORT_BY_NAME:
      const sortedGamesByName = [...state.copyGames];

      // * str1.localCompare(str2) retorna negativo/positivo o 0. Comparando alfabeticamente 2 cadenas a b.
      if (action.payload === 'asc') {
        sortedGamesByName.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === 'desc') {
        sortedGamesByName.sort((a, b) => b.name.localeCompare(a.name));
      }

      return { ...state, copyGames: sortedGamesByName };
    case SORT_BY_RATING:
      const sortedGamesByRating = [...state.copyGames];

      // * EJ - B=5 A=4 , 5 - 4 = 1 (positivo) , entonces el sort coloca a b antes que a.
      if (action.payload === 'highest') {
        sortedGamesByRating.sort((a, b) => b.rating - a.rating);
      } else if (action.payload === 'lowest') {
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
    case EDIT_GAME:
      const { modifiedGame } = action.payload;
      const updatedAllGames = state.allGames.map((game) =>
        game.id === modifiedGame.id ? modifiedGame : game
      );
      const updatedCopyGames = state.copyGames.map((game) =>
        game.id === modifiedGame.id ? modifiedGame : game
      );
      return {
        ...state,
        allGames: updatedAllGames,
        copyGames: updatedCopyGames,
      };
    case DELETE_GAME:
      const { deletedGame } = action.payload;
      const updatedGamesD = state.allGames.filter(
        (game) => game.id !== deletedGame.id
      );
      const updatedCopyGamesD = state.copyGames.filter(
        (game) => game.id !== deletedGame.id
      );
      return {
        ...state,
        allGames: updatedGamesD,
        copyGames: updatedCopyGamesD,
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

export default appReducer;
