import axios from "axios";
const baseURL = "http://localhost:3001";

// * ACTION TYPES
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
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
