import React, { useState } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const BtnEditOrDelete = ({ postId, handlePostId, getDeleteMyPostId }) => {
  const [isBtnClicked, setBtnClicked] = useState(false);

  const handleBtnClicked = () => {
    setBtnClicked(true);
  };

  return (
    <>
      {isBtnClicked && (
        <DropDown onMouseLeave={() => setBtnClicked(false)}>
          <p onClick={() => handlePostId(postId)}>수정</p>
          <p onClick={() => getDeleteMyPostId(postId)}>삭제</p>
        </DropDown>
      )}
      <Container>
        <FontAwesomeIcon
          onMouseOver={handleBtnClicked}
          className="editOrDeleteBtn"
          icon={faEllipsisH}
        />
      </Container>
    </>
  );
};

export default BtnEditOrDelete;

const Container = styled.div`
  position: absolute;
  right: 3px;
  color: ${theme.fontColor};
`;

const DropDown = styled.div`
  width: 150px;
  padding: 3px 10px;
  position: absolute;
  right: -10px;
  top: -10px;
  ${flexCenter}
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 3;

  p {
    margin: 10px 5px;
    font-size: 14px;
    color: ${theme.fontColor};
    cursor: pointer;
  }

  p:last-child {
    color: ${theme.vermilion};
  }
`;
