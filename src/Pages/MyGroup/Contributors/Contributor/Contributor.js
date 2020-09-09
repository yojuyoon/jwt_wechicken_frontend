import React from "react";
import styled from "styled-components";
import Emoji from "../../../../Components/Emoji";
import theme from "../../../../Styles/Theme";
import ProfileIcon from "../../../../Components/ProfileIcon";

const Contributor = ({ person, postsCounting, calculatePenalty }) => {
  return (
    <Container>
      <InfoContainer>
        <ProfileIcon size={41} img={person.profile} />
        <UserInfo>
          <div className="name">{person.name}</div>
          <span className="penalty" role="img" aria-labelledby="money">
            <span>{calculatePenalty(person.blog_counts)}</span>
          </span>
        </UserInfo>
      </InfoContainer>
      <span role="img" aria-labelledby="check">
        <Emoji symbol="✔️" />
        {postsCounting[person.gmail]}
      </span>
    </Container>
  );
};

export default Contributor;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 28px 18px 0 18px;
`;

const InfoContainer = styled.div`
  width: 80%;
  display: flex;
`;

const UserInfo = styled.div`
  width: 100px;
  margin-left: 2px;

  .name {
    margin-bottom: 10px;
  }

  .penalty {
    font-size: 14px;
    color: ${theme.vermilion};

    span {
      margin-left: 4px;
    }
  }
`;
