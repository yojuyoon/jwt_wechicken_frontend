import React from "react";
import styled from "styled-components";
import ProfileIcon from "../../../../Components/ProfileIcon";

const Contributor = ({ person }) => {
  const calculatePenalty = (counts) => {
    if (counts === 1) {
      return "💸 6000";
    } else if (counts === 2) {
      return "💸 3000";
    } else {
      return "🎉 no penalty";
    }
  };

  return (
    <Container>
      <InfoContainer>
        <ProfileIcon size={41} img={person.profile} />
        <UserInfo>
          <div className="name">{person.name}</div>
          <span className="penalty" role="img" aria-labelledby="money">
            {calculatePenalty(person.blog_counts)}
          </span>
        </UserInfo>
      </InfoContainer>
      <span role="img" aria-labelledby="check">
        ✔️ {person.blog_counts}
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
    color: red;
    font-size: 14px;
  }
`;
