import React from "react";
import styled from "styled-components";
import ProfileIcon from "../../../../Components/ProfileIcon";

const Contributor = () => {
  return (
    <Container>
      <InfoContainer>
        <ProfileIcon
          size={41}
          img={
            "https://ca.slack-edge.com/TH0U6FBTN-U015GFJ1284-8d097dfbfe70-512"
          }
        />
        <UserInfo>
          <div className="name">Hyeonji</div>
          <span className="penalty" role="img" aria-labelledby="money">
            💸 3000
          </span>
        </UserInfo>
      </InfoContainer>
      <span role="img" aria-labelledby="check">
        ✔️ 2
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
