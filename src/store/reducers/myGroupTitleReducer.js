import { GET_MYGROUP_TITLE } from "../actions/myGroupTitleAction";
import { IS_MYGROUP_TITLE } from "../actions/myGroupTitleAction";

const myGroupTitleReducer = (state = "", action) => {
  switch (action.type) {
    case GET_MYGROUP_TITLE:
      return action.payload;

    default:
      return state;
  }
};

const myGroupTitleStatusReducer = (state = false, action) => {
  switch (action.type) {
    case IS_MYGROUP_TITLE:
      return action.payload;

    default:
      return state;
  }
};

export { myGroupTitleReducer, myGroupTitleStatusReducer };
