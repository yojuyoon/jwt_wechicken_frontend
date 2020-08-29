import { GET_PROFILE_IMG } from "../actions/loginAction";

const INITIAL_STATE = JSON.parse(sessionStorage.getItem("USER"))?.profile || "";

const userProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_IMG:
      return action.payload;

    default:
      return state;
  }
};

export default userProfileReducer;
