import React from "react";
import styled from "styled-components";
import theme from "../../../Styles/Theme";
import Emoji from "../../../Components/Emoji";
import ProfileIcon from "../../../Components/ProfileIcon";
import Contributor from "../Contributors/Contributor/Contributor";
import { useSelector } from "react-redux";

const Contributors = ({
  myContribution,
  contributor,
  postsCounting,
  myGroup,
}) => {
  const userProfileImg = useSelector((state) => state.userProfileReducer);

  const calculatePenalty = (count) => {
    let totalPenalty = 0;
    if (count < myGroup.count) {
      totalPenalty = myGroup.penalty * myGroup.count - myGroup.penalty * count;
      return (
        <>
          <Emoji symbol="💸" />
          <span>{totalPenalty}</span>
        </>
      );
    }
    if (count >= myGroup.count) {
      return (
        <>
          <Emoji symbol="🎉" />
          <span>no penalty</span>
        </>
      );
    }
  };

  return (
    <Container>
      <MyContribution>
        <InfoContainer>
          <ProfileIcon size={40} img={userProfileImg} />
          <UserInfo>
            <div className="name">{myContribution.name}</div>
            <span className="penalty" role="img" aria-labelledby="celebration">
              {calculatePenalty(postsCounting[myContribution.gmail] || 0)}
            </span>
          </UserInfo>
        </InfoContainer>
        <span role="img" aria-labelledby="check">
          <Emoji symbol="✔️" /> {postsCounting[myContribution.gmail] || 0}
        </span>
      </MyContribution>
      <OtherContribution>
        {contributor.map((person, idx) => {
          return (
            <Contributor
              calculatePenalty={calculatePenalty}
              postsCounting={postsCounting}
              key={idx}
              person={person}
            />
          );
        })}
      </OtherContribution>
    </Container>
  );
};

export default Contributors;

const Container = styled.div`
  max-width: 2080px;
  height: 120px;
  margin: 24px 6vw 0;
  display: flex;
  background: #ffffff;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 28px;

  @media (min-width: 1850px) {
    margin: 24px 2vw;
  }

  @media (max-width: 1650px) {
    margin: 24px 2vw;
  }
`;

const MyContribution = styled.div`
  height: 120px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  width: 60px;
  margin-left: 5px;

  .name {
    margin-bottom: 2px;
  }

  .penalty {
    color: ${theme.vermilion};
    font-size: 14px;
  }
`;

const OtherContribution = styled.div`
  display: flex;
  height: 120px;
  margin-left: 180px;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.yellow};
    border-radius: 28px;
  }
`;
