import { SET_EDITING, SET_ALERT, CLEAR_ALERT } from "../actions/utilsActions";

const initialState = {
  isEditing: false,
  alert: null,
};

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDITING:
      return { ...state, isEditing: action.payload };
    case SET_ALERT:
      return { ...state, alert: action.payload };
    case CLEAR_ALERT:
      return { ...state, alert: null };
    default:
      return { ...state };
  }
};

export default utilsReducer;
