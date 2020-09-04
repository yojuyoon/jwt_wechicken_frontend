import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import axios from "axios";
import { API_URL } from "../../config";
import Card from "../../Components/Card/Card";

const Liked = () => {
  const [selectedMenu, setSelectedMenu] = useState("북마크한 포스트");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/main`).then((res) => {
      setPosts(res.data.posts);
    });
  }, []);

  return (
    <Container>
      <ActiveTab>
        <div className="tabWrap">
          <li
            onClick={(e) => {
              setSelectedMenu(e.target.innerText);
            }}
            className={selectedMenu === "좋아한 포스트" ? "focused" : undefined}
          >
            좋아한 포스트
          </li>
          <li
            onClick={(e) => {
              setSelectedMenu(e.target.innerText);
            }}
            className={
              selectedMenu === "북마크한 포스트" ? "focused" : undefined
            }
          >
            북마크한 포스트
          </li>
          <UnderBar selectedMenu={selectedMenu}></UnderBar>
        </div>
      </ActiveTab>
      <Contents>
        {posts.map((post, i) => {
          return <Card post={post} width={288} space={20} key={i} />;
        })}
      </Contents>
    </Container>
  );
};

export default Liked;

const Container = styled.div`
  padding-top: 111px;
  padding: 111px 81px 0px;
  margin-left: auto;
  margin-right: auto;
`;

const ActiveTab = styled.div`
  padding: 0 20px;

  .tabWrap {
    position: relative;
    display: flex;
    width: 288px;

    li {
      ${flexCenter}
      color: ${theme.deepGrey};
      width: 140px;
      height: 48px;
      padding-bottom: 3px;
      font-size: 18px;
      line-height: 29px;
    }

    .focused {
      color: rgb(52, 58, 64);
      font-weight: 900;
    }
  }
`;

const UnderBar = styled.div`
  position: absolute;
  width: 48%;
  height: 2px;
  display: block;
  bottom: 0px;
  background: ${theme.orange};
  transform: ${({ selectedMenu }) =>
    selectedMenu === "좋아한 포스트" ? "translateX(0)" : "translateX(140px)"};
  transition: all 0.5s ease-in-out;
`;

const Contents = styled.div`
  padding-left: 40px;
  display: flex;
  flex-wrap: wrap;
  padding: 0px !important;
  margin: 28px auto 0 auto;
`;
