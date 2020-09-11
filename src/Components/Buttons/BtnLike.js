import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../config";
import theme from "../../Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as blankHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as blankBookmarks } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as filledBookmarks } from "@fortawesome/free-solid-svg-icons";

const HeartIcon = ({ id, status, handleRemoveCard, type, setActiveAlert }) => {
  const [isLiked, setLiked] = useState(status);

  const handleLikeStatus = () => {
    setLiked(!isLiked);
    if (handleRemoveCard) setTimeout(() => handleRemoveCard(id, type), 500);
    fetchLikeStatus();
  };

  const checkLoginStatus = () => {
    if (JSON.parse(sessionStorage.getItem("USER"))) {
      handleLikeStatus();
    } else {
      setActiveAlert(true);
    }
  };

  const fetchLikeStatus = () => {
    axios({
      method: "post",
      url: `${API_URL}/posts/${type}/${id}`,
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
      },
    });
  };

  return (
    <>
      <Container type={type} onClick={() => checkLoginStatus()}>
        <BlankIcon isLiked={isLiked}>
          <FontAwesomeIcon
            className="blank"
            icon={type === "likes" ? blankHeart : blankBookmarks}
          />
        </BlankIcon>
        <FilledIcon isLiked={isLiked} type={type}>
          <FontAwesomeIcon
            className="filled"
            icon={type === "likes" ? filledHeart : filledBookmarks}
          />
        </FilledIcon>
      </Container>
    </>
  );
};

export default React.memo(HeartIcon);

const Container = styled.div`
  position: absolute;
  right: ${({ type }) => (type === "likes" ? "29" : "2")}px;
`;

const BlankIcon = styled.div`
  display: ${({ isLiked }) => (isLiked ? "none" : "block")};

  .blank {
    width: 20px;
    height: 20px;
    color: ${theme.deepGrey};
  }
`;

const FilledIcon = styled.div`
  display: ${({ isLiked }) => (isLiked ? "block" : "none")};

  .filled {
    width: 20px;
    height: 20px;
    color: ${({ type }) =>
      type === "likes" ? theme.vermilion : theme.middleGrey};
  }
`;
