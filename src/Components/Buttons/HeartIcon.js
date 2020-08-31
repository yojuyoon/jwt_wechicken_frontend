import React from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as blankHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as redHeart } from "@fortawesome/free-solid-svg-icons";

const HeartIcon = ({ isLiked, setLiked, size }) => {
  return (
    <Container
      size={size}
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
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  right: 22px;
  position: absolute;
`;

const BlankHeart = styled.div`
  display: ${(props) => (props.isLiked ? "none" : "block")};

  .blankHeart {
    color: ${theme.deepGrey};
  }
`;

const RedHeart = styled.div`
  display: ${(props) => (props.isLiked ? "block" : "none")};

  .redHeart {
    color: ${theme.vermilion};
    fill: ${theme.vermilion};
  }
`;
