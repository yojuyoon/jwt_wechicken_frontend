import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import ProfileIcon from "../ProfileIcon";
import BtnLike from "../Buttons/BtnLike";

const Card = ({ post, width, space, handleRemoveCard }) => {
  return (
    <Container space={space} width={width}>
      <CardWrap onClick={() => window.location.assign(`${post.link}`)}>
        <ImageBox img={post.thumbnail || "/Images/test.png"} />
        <img
          className="blogLogo"
          alt="blog_logo"
          src={`/Images/${post.type}.png`}
        />
        <ContentsBox>
          <Profile>
            <ProfileIcon size={40} img={post.user_profile} />
            <div className="ProfileText">
              <div className="nth">{post.nth}기</div>
              <div className="name">{post.user_name}</div>
            </div>
          </Profile>
          <Title>{post.title}</Title>
        </ContentsBox>
      </CardWrap>
      <Tags>
        <Tag>알고리즘</Tag>
        <Tag>ReactJs</Tag>
        <Tag>위코드</Tag>
      </Tags>
      <ButtonWrap>
        <BtnLike
          id={post.id}
          status={post.like}
          handleRemoveCard={handleRemoveCard}
          type={"likes"}
        />
        <BtnLike
          id={post.id}
          status={post.bookmark}
          handleRemoveCard={handleRemoveCard}
          type={"bookmarks"}
        />
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
  &:hover {
    transform: translate(0, -10px);
  }
`;

const CardWrap = styled.div`
  width: 100%;
  height: 100%;

  .blogLogo {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
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
`;

const Profile = styled.div`
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
`;

const Title = styled.div`
  height: 35%;
  margin-top: 5px;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 2px;
  color: #2d2b2b;
`;

const Tags = styled.div`
  position: absolute;
  top: 77%;
  left: 15px;
  height: 40px;
  display: flex;
`;

const Tag = styled.div`
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

const ButtonWrap = styled.div`
  width: 80px;
  height: 25px;
  position: absolute;
  bottom: 12px;
  right: 16px;
`;
