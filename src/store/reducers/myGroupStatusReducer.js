import { GET_MYGROUP_STATUS } from "../actions/myGroupStatusAction";

const INITIAL_STATE =
  JSON.parse(sessionStorage.getItem("USER"))?.myGroupStatus || false;

const myGroupStatusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MYGROUP_STATUS:
      return action.payload;

    default:
      return state;
  }
};

export default myGroupStatusReducer;
