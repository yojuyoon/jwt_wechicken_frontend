import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";

const BtnTheme = ({ value }) => {
  return <Container>{value}</Container>;
};

export default BtnTheme;

const Container = styled.div`
  ${flexCenter}
  width: 80px;
  height: 32px;
  padding-top: 4px;
  color: ${theme.white};
  background-color: ${theme.orange};
  border-radius: 1rem;
  cursor: pointer;
`;
