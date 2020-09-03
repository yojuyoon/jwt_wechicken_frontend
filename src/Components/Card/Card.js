import React, { useState } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import ProfileIcon from "../ProfileIcon";
import HeartIcon from "../Buttons/HeartIcon";

const Card = ({ post, width, space }) => {
  const [isLiked, setLiked] = useState(false);

  return (
    <Container space={space} width={width}>
      <CardWrap onClick={() => window.location.assign(`${post.link}`)}>
        <ImageBox img={post.thumbnail || "/Images/test.png"} />
        <ContentsBox>
          <div className="profileWrap">
            <ProfileIcon size={40} img={post.user_profile} />
            <div className="ProfileText">
              <div className="nth">10기</div>
              <div className="name">{post.user_name}</div>
            </div>
          </div>
          <div className="textWrap">
            <div className="title">{post.title}</div>
            {/* <div className="content">
              Greyhound divisively hello coldly wonderfully margina wonderfully
              margo...
            </div> */}
          </div>
        </ContentsBox>
      </CardWrap>
      <ButtonWrap>
        <HeartIcon size={18} isLiked={isLiked} setLiked={setLiked} />
        <FontAwesomeIcon className="bookmarkIcon" icon={faBookmark} />
      </ButtonWrap>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: ${({ width }) => width}px;
  height: 327px;
  margin: ${({ space }) => space}px;
  position: relative;
  border-radius: 7px;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: box-shadow 0.5s ease-in-out;
  cursor: pointer;
  @media (max-width: 1450px) {
    width: 250px;
  }

  @media (max-width: 1450px) {
    width: 250px;
  }

  &:hover {
    transform: translate(0, -10px);
  }
`;

const CardWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageBox = styled.div`
  height: 45%;
  background: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
`;

const ContentsBox = styled.div`
  height: 55%;
  padding: 15px;

  .profileWrap {
    height: 30%;
    ${flexCenter}
    justify-content: flex-start;

    .ProfileText {
      margin-left: 16px;

      .nth {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.6);
      }

      .name {
        margin-top: 5px;
        font-weight: 500;
        font-size: 17px;
        color: #2d2b2b;
      }
    }
  }

  .textWrap {
    height: 35%;
    margin-top: 5px;

    .title {
      font-size: 15px;
      line-height: 20px;
      margin-bottom: 2px;
      color: #2d2b2b;
    }

    .content {
      height: 40px;
      overflow: hidden;
      font-size: 12px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;

  .heartIcon {
    width: 16px;
    height: 16px;
  }

  .bookmarkIcon {
    width: 16px;
    height: 16px;
    margin-left: 10px;
    color: ${theme.deepGrey};
  }
`;
