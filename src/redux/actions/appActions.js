import axios from 'axios';

// * ACTION TYPES
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID';
export const SET_GAME = 'SET_GAME';
export const FILTER_GAMES = 'FILTER_GAMES';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const CREATE_GAME = 'CREATE_GAME';
export const EDIT_GAME = 'EDIT_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_GENRES = 'GET_GENRES';
export const SET_LOADING = 'SET_LOADING';

const API_KEY = import.meta.env.VITE_API_KEY;

// * ACTIONS CREATORS - THUNK.
export const getVideogames = () => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `/games?key=${API_KEY}&page=1&page_size=${200}`
    );

    dispatch({
      type: GET_VIDEOGAMES,
      payload: data.results,
    });
  };
};

export const getVideogamesByName = (name) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `/games?key=${API_KEY}&search=${name}&page_size=${50}`
    );

    dispatch({
      type: GET_VIDEOGAMES_BY_NAME,
      payload: data.results,
    });
  };
};

export const getVideogameById = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/games/${id}?key=${API_KEY}`);

    dispatch({
      type: GET_VIDEOGAME_BY_ID,
      payload: data,
    });
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/platforms?key=${API_KEY}`);

    dispatch({
      type: GET_PLATFORMS,
      payload: data.results,
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`/genres?key=${API_KEY}`);

    dispatch({
      type: GET_GENRES,
      payload: data.results,
    });
  };
};

export const setGame = (game) => {
  return {
    type: SET_GAME,
    payload: game,
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
    const { data } = await axios.post(`/videogames`, newGame);

    dispatch({
      type: CREATE_GAME,
      payload: data,
    });
  };
};

export const editGame = (id, editedGame) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/videogames/${id}`, editedGame);

    dispatch({
      type: EDIT_GAME,
      payload: data,
    });
  };
};

export const deleteGame = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/videogames/${id}`);

    dispatch({
      type: DELETE_GAME,
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
