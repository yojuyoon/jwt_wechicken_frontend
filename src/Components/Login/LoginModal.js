import React from "react";
import styled from "styled-components";
import theme from "../../../src/Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import GoogleLogin from "./GoogleLogin";
import LogoBox from "./LogoBox";

const LoginModal = ({
  setModalOn,
  setExistingUser,
  handleGoogleInput,
  setLoginSuccess,
}) => {
  return (
    <>
      <Container>
        <FontAwesomeIcon
          onClick={() => setModalOn(false)}
          className="BtnClose"
          icon={faTimes}
        />
        <LogoBox />
        <ContentsBox>
          <Greeting>
            <div className="greeting">환영합니다!</div>
            <div className="type">로그인</div>
          </Greeting>
          <GoogleLogin
            setLoginSuccess={setLoginSuccess}
            setModalOn={setModalOn}
            setExistingUser={setExistingUser}
            handleGoogleInput={handleGoogleInput}
          />
        </ContentsBox>
      </Container>
    </>
  );
};

export default LoginModal;

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 675px;
  height: 470px;
  transform: translate(-50%, -50%);
  background-color: ${theme.white};
  box-shadow: -14px -14px 20px rgba(0, 0, 0, 0.02),
    14px 14px 20px rgba(0, 0, 0, 0.05);
  z-index: 11;

  .BtnClose {
    position: absolute;
    right: 0;
    width: 21px;
    height: 21px;
    margin: 15px;
    color: #828282;
    cursor: pointer;
  }
`;

const ContentsBox = styled.div`
  width: 50%;
  padding: 20px 50px 20px 20px;
`;

const Greeting = styled.div`
  .greeting {
    margin-top: 125px;
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    color: #525151;
  }

  .type {
    margin-top: 12px;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 30px;
    color: #000000;
  }
`;
