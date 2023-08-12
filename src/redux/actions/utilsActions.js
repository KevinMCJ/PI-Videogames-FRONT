export const SET_EDITING = "SET_EDITING";
export const SET_ALERT = "SET_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";

export const setCardEdit = (boolean) => {
  return {
    type: SET_EDITING,
    payload: boolean,
  };
};

export const setAlert = (alertObject) => {
  return {
    type: SET_ALERT,
    payload: alertObject,
  };
};

export const clearAlert = () => {
  return {
    type: CLEAR_ALERT,
  };
};
