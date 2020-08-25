export const GET_TOKEN = "GET_TOKEN";
export const INITIAL_LOGIN = "INITIAL_LOGIN";

export const loginToken = (token) => {
  return {
    type: GET_TOKEN,
    payload: token,
  };
};

export const initialLogin = (response) => {
  return {
    type: INITIAL_LOGIN,
    payload: response,
  };
};
