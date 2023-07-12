import { SET_EDITING } from "../actions/utilsActions";

const initialState = {
  isEditing: false,
};

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDITING:
      return { ...state, isEditing: true };
    default:
      return { ...state };
  }
};

export default utilsReducer;
