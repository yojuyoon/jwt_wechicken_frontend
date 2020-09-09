export const GET_SEARCH_KEYWORD = "GET_SEARCH_KEYWORD";

export const searchAction = (keyword) => {
  return {
    type: GET_SEARCH_KEYWORD,
    payload: keyword,
  };
};
