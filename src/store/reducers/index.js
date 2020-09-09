import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userProfileReducer from "./userProfileReducer";
import myGroupStatusReducer from "./myGroupStatusReducer";
import {
  myGroupTitleReducer,
  myGroupTitleStatusReducer,
} from "./myGroupTitleReducer";
import searchKeywordReducer from "./searchReducer";

export default combineReducers({
  loginReducer,
  userProfileReducer,
  myGroupStatusReducer,
  myGroupTitleReducer,
  myGroupTitleStatusReducer,
  searchKeywordReducer,
});
