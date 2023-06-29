import axios from "axios";
const baseURL = "http://localhost:3001";

// * ACTION TYPES
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const FILTER_GAMES = "FILTER_GAMES";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_RATING = "SORT_BY_RATING";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const CREATE_GAME = "CREATE_GAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_GENRES = "GET_GENRES";
export const SET_LOADING = "SET_LOADING";

// * ACTIONS CREATORS - THUNK.
export const getVideogames = () => {
  return async (dispatch) => {
    const endpoint = `${baseURL}/videogames`;
    const { data } = await axios.get(endpoint);

    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  };
};

export const getVideogamesByName = (name) => {
  return async (dispatch) => {
    const endpoint = `${baseURL}/videogames?name=${name}`;
    const { data } = await axios.get(endpoint);

    dispatch({
      type: GET_VIDEOGAMES_BY_NAME,
      payload: data,
    });
  };
};

export const getVideogameById = (id) => {
  return async (dispatch) => {
    const endpoint = `${baseURL}/videogames/${id}`;
    const { data } = await axios.get(endpoint);

    dispatch({
      type: GET_VIDEOGAME_BY_ID,
      payload: data,
    });
  };
};

export const filterGames = (arrFilters) => {
  return {
    type: FILTER_GAMES,
    payload: arrFilters,
  };
};

export const sortGamesByName = (order) => {
  return {
    type: SORT_BY_NAME,
    payload: order,
  };
};

export const sortGamesByRating = (order) => {
  return {
    type: SORT_BY_RATING,
    payload: order,
  };
};

export const createGame = (newGame) => {
  return async (dispatch) => {
    const endpoint = `${baseURL}/videogames`;
    const { data } = await axios.post(endpoint, newGame);

    dispatch({
      type: CREATE_GAME,
      payload: data,
    });
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    const endpoint = `${baseURL}/platforms`;
    const { data } = await axios.get(endpoint);

    dispatch({
      type: GET_PLATFORMS,
      payload: data,
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const endpoint = `${baseURL}/genres`;
    const { data } = await axios.get(endpoint);

    dispatch({
      type: GET_GENRES,
      payload: data,
    });
  };
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

export const clearAllFilters = () => {
  return {
    type: CLEAR_FILTERS,
  };
};
