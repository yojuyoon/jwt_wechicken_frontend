export const GET_MYGROUP_STATUS = "GET_MYGROUP_STATUS";

export const myGroupStatus = (status) => {
  return {
    type: GET_MYGROUP_STATUS,
    payload: status,
  };
};
