import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ContentsColumn from "./MyPageContents/ContentsColumn";
import { myPageContents } from "./MyPageContents/myPageContents";
import ProfileColumn from "./MyPageContents/ProfileColumn";
import { API_URL } from "../../config";
import { useDispatch } from "react-redux";
import { userProfileImg } from "../../store/actions/loginAction";

function MyPage() {
  const [myProfile, setMyProfile] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_URL}/mypage`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      })
      .then((res) => setMyProfile(res.data.mypage));
  }, []);

  const deleteProfileImg = (e) => {
    axios
      .delete(`${API_URL}/mypage?deleted=${e.target.dataset.name}`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          dispatch(userProfileImg(null));
          sessionStorage.setItem(
            "USER",
            JSON.stringify({
              token: JSON.parse(sessionStorage.getItem("USER"))?.token,
              profile: null,
            })
          );
        }
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
  padding: 120px;

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
