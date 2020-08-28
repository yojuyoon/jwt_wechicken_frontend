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
    axios
      .get(`${API_URL}/mypage`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => setMyProfile(res.data.mypage));
  }, []);

  const deleteProfileImg = (e) => {
    axios.delete(`${API_URL}/mypage?deleted=${e.target.dataset.name}`, {
      headers: { Authorization: sessionStorage.getItem("token") },
    });
  };

  return (
    <MyPageContainer>
      <ProfileColumn
        deleteProfileImg={deleteProfileImg}
        myProfile={myProfile}
      />
      <MyPageContents>
        {myPageContents.map((item, index) => {
          return (
            <ContentsColumn
              deleteProfileImg={deleteProfileImg}
              myProfile={myProfile}
              key={index}
              item={item}
            />
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
