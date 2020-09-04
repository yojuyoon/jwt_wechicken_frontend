export const GET_MYGROUP_TITLE = "GET_MYGROUP_TITLE";

export const myGroupTitle = (title) => {
  return {
    type: GET_MYGROUP_TITLE,
    payload: title,
  };
};
