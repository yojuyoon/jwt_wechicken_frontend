import React from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";
import Contributors from "./Contributors/Contributors";
import PostsOfTheWeek from "../../Components/PostsOfTheWeek/PostsOfTheWeek";

const MyGroup = () => {
  return (
    <Container>
      <HallFrame>
        <img alt="chicken_bong" src="/Images/chicken.png" />
      </HallFrame>
      <ContentWrap>
        <ThisWeek>
          <div className="title">이주의 포스팅</div>
          <PostsOfTheWeek />
        </ThisWeek>
        <Contribution>
          <div className="title">이주의 공헌</div>
          <Contributors />
        </Contribution>
      </ContentWrap>
    </Container>
  );
};

export default MyGroup;

const Container = styled.body`
  padding: 0 81px;
  padding-top: 111px;
`;

const HallFrame = styled.div`
  height: 304px;
  margin-top: 36px;
  padding: 70px;
  border-radius: 34px;
  background-color: ${theme.yellow};
  display: flex;
  align-items: center;

  img {
    width: 200px;
    height: 200px;
  }
`;

const ContentWrap = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
`;

const ThisWeek = styled.div`
  width: 80%;

  .title {
    width: 146px;
    padding-bottom: 3px;
    font-family: ${theme.fontContent};
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    border-bottom: 4px solid ${theme.orange};
  }
`;

const Contribution = styled.div`
  width: 250px;
  margin-left: 20px;
  .title {
    width: 123px;
    padding-bottom: 3px;
    font-family: ${theme.fontContent};
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    border-bottom: 4px solid ${theme.orange};
  }
`;
