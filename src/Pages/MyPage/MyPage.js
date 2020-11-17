import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MyPosts from "./MyPageContents/MyPosts";
import ProfileColumn from "./MyPageContents/ProfileColumn";
import Alert from "../../Components/Alert"
import { API_URL } from "../../config";
import { useDispatch } from "react-redux";
import { userProfileImg } from "../../store/actions/loginAction";

function MyPage() {
  const [myProfile, setMyProfile] = useState({});
  const [isActiveAlert, setIsActiveAlert] = useState(false)
  const [deletePostId, setDeletePostId] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${API_URL}/mypage`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      })
      .then((res) => setMyProfile(res.data.mypage));
  }, []);

  const deleteProfileImg = (deleteTarget) => {
    axios
      .delete(`${API_URL}/mypage?deleted=${deleteTarget}`, {
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
              ...JSON.parse(sessionStorage.getItem("USER")),
              profile: null,
            })
          );
        }
      });
  };

  const deleteMyPost = (deletePostId) => {
    axios
      .delete(`http://15.165.177.193:8001/mypage/post/${deletePostId}`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          const posts = myPosts.filter((post) => post.id !== deletePostId)
          setMyPosts(posts)
        }
      });
  };

  const getDeleteMyPostId = (deletePostId) => {
    setDeletePostId(deletePostId)
    setIsActiveAlert(true)
  }

  return (
    <>
      <MyPageContainer>
        <ProfileColumn
          deleteProfileImg={deleteProfileImg}
          myProfile={myProfile}
        />
        <MyPosts 
          getDeleteMyPostId={getDeleteMyPostId}
          myPosts={myPosts}
          setMyPosts={setMyPosts}/>

        {isActiveAlert && (
        <Alert
          setActiveAlert = {setIsActiveAlert}
          alertMessage={"삭제 하시겠습니까?"}
          excuteFunction={() => {
            deleteMyPost(deletePostId)
          }}
          submitBtn={"확인"}
          closeBtn={"취소"}
        />
      )}
      </MyPageContainer>
    </>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  padding: 120px;

  button {
    cursor: pointer;
  }
`;
