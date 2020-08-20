import React from "react";
import styled from "styled-components";

function MiniPostCard({ post }) {
  return (
    <MiniPostCardContainer>
      <PostContent onClick={() => window.location.assign(`${post.link}`)}>
        <div className="profile">
          <img alt="profile" src={post.user_thumbnail} />
        </div>
        <div className="contents">
          <span>{post.user_name}</span>
          <span className="postText">{post.subtitle}</span>
        </div>
      </PostContent>
      <PostDateAndType>
        <span>{post.date}</span>
        <div className="blogLogo">
          <img alt="profile" src="/Images/medium.png" />
        </div>
      </PostDateAndType>
    </MiniPostCardContainer>
  );
}

export default MiniPostCard;

const MiniPostCardContainer = styled.div`
  width: 180px;
  height: 90px;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 7px;
`;

const PostContent = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  img {
    width: 33px;
    height: 33px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .contents {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
    }
    .postText {
      width: 112px;
      height: 23px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 6px;
      font-size: 13px;
    }
  }
`;

const PostDateAndType = styled.div`
  margin: 0px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 12px;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;
