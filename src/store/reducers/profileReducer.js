import { GET_PROFILE_IMG } from "../actions/loginAction";

const INITIAL_STATE = "";

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_IMG:
      return action.payload;

    default:
      return state;
  }
};

export default profileReducer;
