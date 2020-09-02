import React from "react";
import styled from "styled-components";
import ProfileIcon from "../ProfileIcon";

function MiniPostCard({ post }) {
  return (
    <MiniPostCardContainer>
      <PostContent onClick={() => window.location.assign(`${post.link}`)}>
        <ProfileIcon size={33} img={post.user_profile} />
        <div className="contents">
          <span>{post.user_name}</span>
          <span className="postText">{post.title}</span>
        </div>
      </PostContent>
      <PostDateAndType>
        <span>{post.date}</span>
        <div className="blogLogo">
          <img alt="blog_logo" src={`/Images/${post.type}.png`} />
        </div>
      </PostDateAndType>
    </MiniPostCardContainer>
  );
}

export default MiniPostCard;

const MiniPostCardContainer = styled.div`
  width: 220px;
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
  .contents {
    margin-left: 10px;
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
