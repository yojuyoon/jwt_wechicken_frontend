import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../src/Styles/Theme";

const LogoBox = () => {
  return (
    <Container>
      <img className="logoImage" alt="logo" src="/Images/logo.png"></img>
      <span>>wechicken</span>
    </Container>
  );
};

export default LogoBox;

const Container = styled.div`
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
