import { combineReducers } from "redux";
import activeIndex from "./activeIndex";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  activeIndex,
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
