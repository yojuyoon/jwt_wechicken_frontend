import React from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";

function CelebratingModal({ celebratingMessage }) {
  return (
    <Container>
      <CelebratingImg>
        <div className="firework" />
        <div className="beer" />
        <div className="firework" />
      </CelebratingImg>
      <CelebratingText>
        <span>{celebratingMessage}</span>
      </CelebratingText>
    </Container>
  );
}

export default CelebratingModal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 675px;
  height: 470px;
  background-color: ${theme.white};
  transform: translate(-50%, -50%);
  box-shadow: -14px -14px 20px rgba(0, 0, 0, 0.02),
    14px 14px 20px rgba(0, 0, 0, 0.05);
  z-index: 99;
`;

const CelebratingImg = styled.div`
  padding: 60px;
  display: flex;
  justify-content: space-between;

  .firework {
    width: 100px;
    height: 100px;
    margin-top: 30px;
    background: url("/Images/firework.png");
    background-size: contain;
    background-repeat: no-repeat;
    animation: blink-animation 0.4s steps(4, start) infinite;
  }

  @keyframes blink-animation {
    from {
      visibility: visibility;
    }
    to {
      visibility: hidden;
    }
  }

  .beer {
    width: 130px;
    height: 130px;
    background: url("/Images/beer.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const CelebratingText = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 27px;
  color: ${theme.orange};
`;
