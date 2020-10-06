import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";
import axios from "axios";
import { loginToken, userProfileImg } from "../../store/actions/loginAction";
import { myGroupStatus } from "../../store/actions/myGroupStatusAction";
import { useDispatch } from "react-redux";
import { API_URL } from "../../config";

let auth2;

const GoogleLogin = ({
  setLoginSuccess,
  setModalOn,
  setExistingUser,
  handleGoogleInput,
}) => {
  const googleLoginBtn = useRef(null);

  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    googleSDK();
    return () => {
      axios.CancelToken.source().cancel();
    };
    // eslint-disable-next-line
  }, []);

  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load("auth2", () => {
        auth2 = window.gapi.auth2.init({
          client_id: `502511283549-far2914uktcjdvqk6blqi5251vnvbms5.apps.googleusercontent.com`,
          scope: "profile email",
        });
      });
    };

    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  };

  const GoogleApiPOST = async (token) => {
    try {
      setLoginSuccess(true);
      const res = await axios.post(`${API_URL}/auth/login/google`, {
        googleToken: token,
      });
      if (res.data.message === "FIRST") {
        setExistingUser(false);
      } else {
        sessionStorage.setItem(
          "USER",
          JSON.stringify({
            token: res.data.token,
            profile: res.data.profile,
            myGroupStatus: res.data.myGroupStatus,
            myNth: res.data.nth,
            master: res.data.master,
          })
        );
        setTimeout(() => {
          setLoginSuccess(false);
          setModalOn(false);
         },1000);
        dispatch(loginToken(res.data.token));
        dispatch(userProfileImg(res.data.profile));
        dispatch(myGroupStatus(res.data.myGroupStatus));
      }
    } catch (error) {
      alert("에러가 발생했습니다");
    }
  };

  const googleLoginClickHandler = () => {
    auth2
      .signIn({
        scope: "profile email",
      })
      .then((googleUser) => {
        const profile = googleUser.getBasicProfile();
        handleGoogleInput(profile);
        GoogleApiPOST(googleUser.getAuthResponse().id_token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <GoogleBtn id="gSignInWrapper">
      <span className="label" />
      <div
        ref={googleLoginBtn}
        id="customBtn"
        className="customGPlusSignIn"
        onClick={googleLoginClickHandler}
      >
        <span className="icon"></span>
        <span className="buttonText">구글로 로그인하기</span>
      </div>
    </GoogleBtn>
  );
};

export default GoogleLogin;

const GoogleBtn = styled.div`
  #customBtn {
    width: 184px;
    height: 38px;
    border: none;
    margin-top: 85px;
    margin-bottom: 3px;
    padding-left: 4%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: rgba(255, 153, 0, 0.7);
  }
  #customBtn:hover {
    cursor: pointer;
  }
  span.label {
    font-family: ${theme.fontContent};
    font-weight: normal;
  }
  span.icon {
    background: url("/Images/google_logo.svg") no-repeat;
    background-size: 50%;
    background-position: center;
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
  }
  span.buttonText {
    font-family: ${theme.fontContent};
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: ${theme.white};
  }
`;
