import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../Styles/Theme";

const MyGroupJoinModal = ({ setActiveAlert }) => {
  return (
    <MyGroupJoinModalContainer>
      <span>동기들의 포스트를 보고싶다면?</span>
      <button onClick={() => setActiveAlert(true)} className="joinBtn">
        치킨계 가입하고 전체 보기
      </button>
    </MyGroupJoinModalContainer>
  );
};

export default MyGroupJoinModal;

const MyGroupJoinModalContainer = styled.div`
  width: 500px;
  height: 300px;
  ${flexCenter};
  flex-direction: column;
  position: absolute;
  top: 150px;
  background-color: ${theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.09);
  z-index: 2;

  span {
    font-size: 16px;
    font-weight: 600;
    color: ${theme.fontColor};
  }

  .joinBtn {
    width: 200px;
    height: 40px;
    margin-top: 30px;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: ${theme.orange};
    color: ${theme.white};
    opacity: 0.9;
    cursor: pointer;
  }

  .joinBtn:hover {
    opacity: 1;
  }
`;
