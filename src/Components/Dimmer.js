import React from "react";
import styled from "styled-components";

const Dimmer = () => {
  return <Container />;
};

export default Dimmer;

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
`;
