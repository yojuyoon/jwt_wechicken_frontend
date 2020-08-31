import React from "react";
import styled from "styled-components";

const ProfileIcon = ({ size, img }) => {
  return <Container size={size} img={img || "/Images/default.png"}></Container>;
};

export default React.memo(ProfileIcon);

const Container = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: url(${({ img }) => img});
  background-size: cover;
  border-radius: 50%;
  cursor: pointer;
`;
