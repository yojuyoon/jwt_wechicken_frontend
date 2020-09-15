import React from "react";
import styled from "styled-components";
import Emoji from "../../../../Components/Emoji";
import theme from "../../../../Styles/Theme";
import ProfileIcon from "../../../../Components/ProfileIcon";

const Contributor = ({ person, postsCounting, calculatePenalty }) => {
  return (
    <Container>
      <InfoContainer>
        <ProfileIcon size={34} img={person.profile} />
        <UserInfo>
          <div className="name">{person.name}</div>
          <span className="penalty" role="img" aria-labelledby="money">
            <span>{calculatePenalty(postsCounting[person.gmail] || 0)}</span>
          </span>
        </UserInfo>
      </InfoContainer>
      <span role="img" aria-labelledby="check">
        <Emoji symbol="✔️" />
        {postsCounting[person.gmail] || 0}
      </span>
    </Container>
  );
};

export default Contributor;

const Container = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 35px 0;
  padding: 28px 18px 10px 18px;
  line-height: 50%;
  border-right: 1px solid ${theme.orange};
  &:last-child {
    border: none;
  }
`;

const InfoContainer = styled.div`
  width: 80%;
  display: flex;
`;

const UserInfo = styled.div`
  width: 65px;
  margin-left: 5px;

  .name {
    margin-bottom: 10px;
  }

  .penalty {
    font-size: 14px;
    color: ${theme.vermilion};
  }
`;
