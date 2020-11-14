import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";

const BtnTheme = ({ value, handleFunction }) => {
  return <Container onClick={() => handleFunction()}>{value}</Container>;
};

export default BtnTheme;

const Container = styled.div`
  ${flexCenter}
  font-family: ${theme.fontContent};
  width: 82px;
  height: 32px;
  color: ${theme.white};
  background-color: ${theme.orange};
  border-radius: 1rem;
  cursor: pointer;
`;
