import React from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as blankHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as redHeart } from "@fortawesome/free-solid-svg-icons";

const HeartIcon = ({ isLiked, setLiked }) => {
  return (
    <Container
      onClick={() => {
        setLiked(!isLiked);
      }}
    >
      <BlankHeart isLiked={isLiked}>
        <FontAwesomeIcon className="blankHeart" icon={blankHeart} />
      </BlankHeart>
      <RedHeart isLiked={isLiked}>
        <FontAwesomeIcon className="redHeart" icon={redHeart} />
      </RedHeart>
    </Container>
  );
};

export default HeartIcon;

// Styled Components

const Container = styled.div`
  position: absolute;
  right: 30px;
  width: 21px;
  height: 21px;
`;

const BlankHeart = styled.div`
  display: ${(props) => (props.isLiked ? "none" : "block")};

  .blankHeart {
    width: 21px;
    height: 21px;
    color: ${theme.deepGrey};
  }
`;

const RedHeart = styled.div`
  display: ${(props) => (props.isLiked ? "block" : "none")};

  .redHeart {
    width: 21px;
    height: 21px;
    color: red;
    fill: red;
  }
`;
