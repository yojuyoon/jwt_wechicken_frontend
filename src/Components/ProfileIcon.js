import React from "react";
import styled from "styled-components";

const ProfileIcon = ({ size, img }) => {
  return <Container size={size} img={img}></Container>;
};

export default ProfileIcon;

const Container = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: url(${({ img }) => img});
  background-size: cover;
  border-radius: 50px;
`;
