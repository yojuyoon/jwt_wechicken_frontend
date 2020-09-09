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

  const calculatePenalty = (counts) => {
    if (counts) {
      return (
        <>
          <Emoji symbol="💸" />
          <span>{myGroup.penalty * myGroup.count}</span>
        </>
      );
    } else {
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
          <ProfileIcon size={46} img={userProfileImg} />
          <UserInfo>
            <div className="name">{myContribution.name}</div>
            <span className="penalty" role="img" aria-labelledby="celebration">
              {calculatePenalty(myContribution.postsCount)}
            </span>
          </UserInfo>
        </InfoContainer>
        <span role="img" aria-labelledby="check">
          <Emoji symbol="✔️" /> {myContribution.postsCount}
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
  width: 250px;
  height: 560px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  background-color: hotpink;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 4px 4px 10px rgba(0, 0, 0, 0.06);
  border-radius: 28px;
`;

const MyContribution = styled.div`
  width: 250px;
  height: 90px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 18px 10px 18px;
  background-color: ${theme.white};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  width: 100px;
  margin-left: 2px;

  .name {
    margin-bottom: 10px;
  }

  .penalty {
    color: red;
    font-size: 14px;
  }
`;

const OtherContribution = styled.div`
  margin-top: 80px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
    height: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.yellow};
    border-radius: 10px;
  }
`;
