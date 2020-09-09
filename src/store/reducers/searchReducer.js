import { GET_SEARCH_KEYWORD } from "../actions/searchAction";

const INITIAL_STATE = "";

const searchKeywordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SEARCH_KEYWORD:
      return action.payload;

    default:
      return state;
  }
};

export default searchKeywordReducer;
