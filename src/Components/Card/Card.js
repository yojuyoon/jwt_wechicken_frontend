import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import ProfileIcon from "../ProfileIcon";
import HeartIcon from "../Buttons/HeartIcon";

const Card = () => {
  const [isLiked, setLiked] = useState(false);

  const onClickCard = () => {
    console.log("전체클릭");
  };

  useEffect(() => {
    axios.get("http://localhost:3000/data/medium.json").then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <Container>
      <CardWrap onClick={onClickCard}>
        <ImageBox />
        <ContentsBox>
          <div className="profileWrap">
            <ProfileIcon size={40} img={"/Images/logo.png"} />
            <div className="ProfileText">
              <div className="nth">10기</div>
              <div className="name">최준</div>
            </div>
          </div>
          <div className="textWrap">
            <div className="title">여기는 제목입니다. 뭘 적지?</div>
            <div className="content">
              Greyhound divisively hello coldly wonderfully margina wonderfully
              margina ivisively hello coldly wonderfully margina wonderfullyonde
              rfully margina wonderfull...
            </div>
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
  width: 288px;
  height: 327px;
  margin: 10px;
  position: relative;
  border-radius: 7px;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: box-shadow 0.5s ease-in-out;

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
  background: url("/Images/test.png");
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

      .name {
        font-weight: 500;
        font-size: 17px;
        line-height: 28px;
      }

      .nth {
        font-size: 13px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .textWrap {
    height: 35%;
    margin-top: 5px;

    .title {
      font-size: 15px;
      line-height: 20px;
      margin-bottom: 8px;
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
