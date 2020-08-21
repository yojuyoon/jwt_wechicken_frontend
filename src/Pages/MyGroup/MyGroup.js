import React from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";
import Contributors from "./Contributors/Contributors";

const MyGroup = () => {
  return (
    <Container>
      <HallFrame></HallFrame>
      <ContentWrap>
        <ThisWeek>
          <div className="title">이주의 포스팅</div>
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
  border-radius: 34px;
  background-color: ${theme.yellow};
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  height: 10000px;
`;

const ThisWeek = styled.div`
  /* width: 80%; */

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
