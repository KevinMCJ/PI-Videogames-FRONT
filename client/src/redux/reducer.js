const {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_VIDEOGAME_BY_ID,
  GET_GENRES,
  SET_LOADING,
} = require("./actions");

const initialState = {
  isLoading: false,
  allGames: [],
  copyGames: [],
  game: {},
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
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
