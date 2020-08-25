import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../src/Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import GoogleLogin from "./GoogleLogin";

const LoginModal = ({ setModalOn, setExistingUser, handleGoogleInput }) => {
  return (
    <Container>
      <FontAwesomeIcon
        onClick={() => setModalOn(false)}
        className="BtnClose"
        icon={faTimes}
      />
      <LogoBox>
        <img className="logoImage" alt="logo" src="/Images/logo.png"></img>
        <span>>wechicken</span>
      </LogoBox>
      <ContentsBox>
        <Greeting>
          <div className="greeting">환영합니다!</div>
          <div className="type">로그인</div>
        </Greeting>
        <GoogleLogin
          setModalOn={setModalOn}
          setExistingUser={setExistingUser}
          handleGoogleInput={handleGoogleInput}
        />
        <ChangeType>
          <span className="question">아직 회원이 아니신가요?</span>
          <span className="anotherType">회원가입</span>
        </ChangeType>
      </ContentsBox>
    </Container>
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
  z-index: 2;

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

const LogoBox = styled.div`
  width: 50%;
  ${flexCenter}
  flex-direction: column;

  .logoImage {
    width: 157px;
    height: 157px;
  }

  span {
    margin-top: 10px;
    font-family: ${theme.fontTitle};
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: #1a202c;
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

const ChangeType = styled.div`
  width: 100%;
  margin-top: 99px;
  display: flex;
  justify-content: flex-end;

  .question {
    font-size: 14px;
    line-height: 20px;
    color: #565454;
  }

  .anotherType {
    margin-left: 5px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #ff9900;
  }
`;
