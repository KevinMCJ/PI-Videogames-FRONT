export const SET_EDITING = "SET_EDITING";

export const setCardEdit = (boolean) => {
  return {
    type: SET_EDITING,
    payload: boolean,
  };
};
