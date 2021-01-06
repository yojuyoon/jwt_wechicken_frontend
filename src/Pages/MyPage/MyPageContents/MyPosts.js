import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { HeaderBox, MainContentCards } from "../../../Styles/Theme";
import { SEARCH_URL } from "../../../config";
import Card from "../../../Components/Card/Card";
import Dimmer from "../../../Components/Dimmer";
import MyPostEditModal from "./Components/MyPostEditModal";

function MyPosts({ myPosts, setMyPosts, getDeleteMyPostId }) {
  const [isAddModalActive, setAddModalActive] = useState(false);
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    !isAddModalActive &&
      axios
        .get(`${SEARCH_URL}/mypage/posts`, {
          headers: {
            Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
          },
        })
        .then((res) => setMyPosts(res.data.myPosts));
  }, [isAddModalActive, setMyPosts]);

  const handlePostId = (id) => {
    setPostId(id);
    setAddModalActive(true);
  };
  return (
    <>
      <Container>
        <HeaderBox width={100}>
          <div className="title">내 포스트</div>
        </HeaderBox>
        <MainContentCards>
          {myPosts.map((post, idx) => {
            return (
              <Card
                key={idx}
                handlePostId={handlePostId}
                getDeleteMyPostId={getDeleteMyPostId}
                post={post}
                width={288}
                space={20}
              />
            );
          })}
          {isAddModalActive && (
            <>
              <Dimmer />
              <MyPostEditModal
                post={myPosts.find((post) => postId === post.id)}
                setAddModalActive={setAddModalActive}
              />
            </>
          )}
        </MainContentCards>
      </Container>
    </>
  );
}

export default MyPosts;

const Container = styled.div`
  padding-top: 150px;
`;
