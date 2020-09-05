export const GET_MYGROUP_TITLE = "GET_MYGROUP_TITLE";
export const IS_MYGROUP_TITLE = "IS_MYGROUP_TITLE";

export const myGroupTitle = (title) => {
  return {
    type: GET_MYGROUP_TITLE,
    payload: title,
  };
};

export const myGroupTitleStatus = (status) => {
  return {
    type: IS_MYGROUP_TITLE,
    payload: status,
  };
};
