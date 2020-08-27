export const GET_TOKEN = "GET_TOKEN";
export const INITIAL_LOGIN = "INITIAL_LOGIN";
export const GET_PROFILE_IMG = "GET_PROFILE_IMG";

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

export const profileImage = (img) => {
  return {
    type: GET_PROFILE_IMG,
    payload: img,
  };
};
