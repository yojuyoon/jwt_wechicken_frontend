import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../Styles/Theme";
import ProfileIcon from "../ProfileIcon";
import BtnLike from "../Buttons/BtnLike";
import BtnEditOrDelete from "../Buttons/BtnEditOrDelete";

const Card = ({
  post,
  width,
  space,
  handleRemoveCard,
  setActiveAlert,
  handleModifyModal,
  search,
  handlePostId,
  getDeleteMyPostId,
}) => {
  return (
    <>
      <Container space={space} width={width} search={search}>
        <CardWrap type={post.type} onClick={() => window.open(`${post.link}`)}>
          <ImageBox img={post.thumbnail || "/Images/blogDefaultImg.png"} />
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
            <Title search={search}>{post.title}</Title>
            {!!search && (
              <Subtitle>
                {post.subtitle?.length < 125
                  ? post.subtitle
                  : post.subtitle?.substr(0, 125) + ".."}
              </Subtitle>
            )}
          </ContentsBox>
        </CardWrap>
        <Tags>{post.date}</Tags>
        <ButtonWrap>
          {typeof post.like === "boolean" ? (
            <>
              <BtnLike
                id={post.id}
                status={post.like}
                handleRemoveCard={handleRemoveCard}
                type={"likes"}
                setActiveAlert={setActiveAlert}
              />
              <BtnLike
                id={post.id}
                status={post.bookmark}
                handleRemoveCard={handleRemoveCard}
                type={"bookmarks"}
                setActiveAlert={setActiveAlert}
              />
            </>
          ) : (
            <BtnEditOrDelete
              postId={post.id}
              handlePostId={handlePostId}
              getDeleteMyPostId={getDeleteMyPostId}
              handleModifyModal={handleModifyModal}
            />
          )}
        </ButtonWrap>
      </Container>
    </>
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
    width: ${({ search, width }) => (search ? width : 250)}px;
    }
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
    display: ${({ type }) =>
      ["velog", "medium"].includes(type) ? "block" : "none"};
  }
`;

const ImageBox = styled.div`
  height: 40%;
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
  margin: 5px 0;
  font-size: 15px;
  font-weight: ${({ search }) => (search ? 500 : 400)};
  line-height: 20px;
  margin-bottom: 2px;
  color: #2d2b2b;
`;

const Subtitle = styled.div`
  height: 30%;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 2px;
  color: #2d2b2b;
`;

const Tags = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 14px;
`;

const ButtonWrap = styled.div`
  width: 80px;
  height: 25px;
  position: absolute;
  bottom: 12px;
  right: 16px;
`;
