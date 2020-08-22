import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ContentsColumn from "./MyPageContents/ContentsColumn";
import { myPageContents } from "./MyPageContents/myPageContents";
import ProfileColumn from "./MyPageContents/ProfileColumn";
import { API_URL } from "../../config";
import theme from "../../Styles/Theme";

function MyPage() {
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    sessionStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ3ZWNvZGVfbnRoIjoxLCJpYXQiOjE1OTgzNDc4ODJ9.3RPTZXc9dH8mOIqiLrAi1VDdJvxgLVxjCcvnKZ4Y7fc"
    );
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/mypage`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => setMyProfile(res.data.mypage));
  });

  return (
    <MyPageContainer>
      <ProfileColumn myProfile={myProfile} />
      <MyPageContents>
        {myPageContents.map((item, index) => {
          return (
            <ContentsColumn myProfile={myProfile} key={index} item={item} />
          );
        })}
      </MyPageContents>
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  padding: 100px;
  background: ${theme.background};

  button {
    cursor: pointer;
  }
`;

const MyPageContents = styled.section`
  padding: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
