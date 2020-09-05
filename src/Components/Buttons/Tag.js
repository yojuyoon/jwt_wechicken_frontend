import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";

const Tag = ({ value }) => {
  return <Container>{value}</Container>;
};

export default Tag;

const Container = styled.div`
  ${flexCenter};
  height: 25px;
  margin-right: 8px;
  padding: 0 3px;
  background-color: ${theme.grey};
  border-radius: 2px;
  font-size: 13px;
  color: ${theme.deepGrey};
  &:hover {
    background-color: ${theme.grey};
    opacity: 0.7;
  }
`;
