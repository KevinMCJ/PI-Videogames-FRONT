import { combineReducers } from "redux";
import appReducer from "./appReducer";
import utilsReducer from "./utilsReducer";

const rootReducer = combineReducers({
  app: appReducer,
  utils: utilsReducer,
});

export default rootReducer;
