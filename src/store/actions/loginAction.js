export const GET_TOKEN = "GET_TOKEN";
export const GET_PROFILE_IMG = "GET_PROFILE_IMG";

export const loginToken = (token) => {
  return {
    type: GET_TOKEN,
    payload: token,
  };
};

export const userProfileImg = (img) => {
  return {
    type: GET_PROFILE_IMG,
    payload: img,
  };
};
