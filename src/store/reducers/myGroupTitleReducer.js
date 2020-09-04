import { GET_MYGROUP_TITLE } from "../actions/myGroupTitleAction";

const INITIAL_STATE = "";

const myGroupTitleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MYGROUP_TITLE:
      return action.payload;

    default:
      return state;
  }
};

export default myGroupTitleReducer;
