import { GET_TOKEN } from "../actions/loginAction";

const INITIAL_STATE = JSON.parse(sessionStorage.getItem("USER"))?.token || "";

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return action.payload;

    default:
      return state;
  }
};

export default loginReducer;
