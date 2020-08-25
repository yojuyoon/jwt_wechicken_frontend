import { GET_TOKEN, INITIAL_LOGIN } from "../actions/loginAction";

const INITIAL_STATE = sessionStorage.getItem("token") || "";

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return action.payload;

    case INITIAL_LOGIN:
      return action.payload === "first" ? true : false;

    default:
      return state;
  }
};

export default loginReducer;
