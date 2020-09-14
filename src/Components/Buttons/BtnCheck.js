import React from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";

const BtnCheck = ({ text, handleCheckBox, isChecked }) => {
  return (
    <Container onClick={() => handleCheckBox(text)} isChecked={isChecked}>
      <div className="check" />
      <div className="checked">✓</div>
      <div className="text">{text}</div>
    </Container>
  );
};

export default BtnCheck;

const Container = styled.div`
  padding-left: 12px;
  margin-top: 12px;
  display: flex;

  .check {
    width: 12px;
    height: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: ${({ isChecked }) => (isChecked ? "none" : "block")};
  }

  .checked {
    width: 12px;
    height: 12px;
    padding-left: 2px;
    color: ${theme.white};
    font-size: 12px;
    font-weight: 700;
    border: 1px solid #ff9900;
    border-radius: 50%;
    background-color: #ff9900;
    display: ${({ isChecked }) => (isChecked ? "block" : "none")};
  }

  .text {
    margin-left: 5px;
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    color: #8a8383;
  }
`;
