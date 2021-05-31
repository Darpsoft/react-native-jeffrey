import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import home from "./home";

const reducers = combineReducers({
  auth,
  settings,
  home,
});

export default reducers;
