import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
  loginReducer,
  userProfileReducer,
});
