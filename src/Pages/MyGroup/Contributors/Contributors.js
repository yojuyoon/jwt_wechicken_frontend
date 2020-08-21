import React from "react";
import styled from "styled-components";
import theme from "../../../Styles/Theme";
import ProfileIcon from "../../../Components/ProfileIcon";
import Contributor from "../Contributors/Contributor/Contributor";

const Contributors = () => {
  return (
    <Container>
      <MyContribution>
        <InfoContainer>
          <ProfileIcon
            size={46}
            img={
              "https://miro.medium.com/fit/c/256/256/1*Mzkzg31wDXjEDVKYRqsLXw.jpeg"
            }
          />
          <UserInfo>
            <div className="name">JunChoi</div>
            <span className="penalty" role="img" aria-labelledby="celebration">
              🎉 no penalty
            </span>
          </UserInfo>
        </InfoContainer>
        <span role="img" aria-labelledby="check">
          ✔️ 3
        </span>
      </MyContribution>
      <OtherContribution>
        <Contributor />
      </OtherContribution>
    </Container>
  );
};

export default Contributors;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 548px;
  margin-top: 24px;
  background-color: hotpink;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 4px 4px 10px rgba(0, 0, 0, 0.06);
  border-radius: 28px;
`;

const MyContribution = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 90px;
  padding: 30px 18px 10px 18px;
  background-color: ${theme.white};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.07);
  overflow: hidden;
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
