import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Card from "../../Components/Card/Card";
import theme, { flexCenter } from "../../Styles/Theme";
import { API_URL } from "../../config";
import usePagination from "../../hooks/usePagination";

function Main() {
  const [posts, setPosts] = useState([]);
  const [target, setTarget] = useState("");
  const [page, setPage] = useState(0);
  const SIZE = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
    window.onbeforeunload = () => window.scrollTo(0, 0);
  }, []);

  const handleFetch = async () => {
    setPage(page + 1);
    const res = await axios.get(
      `${API_URL}/main?page=${page}&size=${SIZE}`,
      sessionStorage.getItem("USER") && {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      }
    );
    setPosts([...posts, ...res.data.posts]);
    setTarget(document.querySelector("#last"));
  };

  const pagination = usePagination(target, handleFetch);
  useEffect(() => pagination, [target, pagination]);

  return (
    <MainPageContainer>
      <MainBanner>
        <div className="bannerImg" />
        <BannerContent>
          <h1 className="greeting">Hi!</h1>
          <h2 className="title">wechicken OPEN!</h2>
          <div className="text">
            <p>
              wechicken OPEN! <br></br>
              릴리즈 기념 이벤 진행! <br></br>
              기수 전원 가입 시 치킨 한마리 공짜!<br></br>
            </p>
          </div>
          <button className="moreBtn">더보기 ▸</button>
        </BannerContent>
      </MainBanner>
      <MainContents>
        <MainContentTitle>
          <div className="titleContainer">
            <FontAwesomeIcon className="check" icon={faCheck} />
            <h1 className="contentTitle">트렌딩 포스트</h1>
          </div>
        </MainContentTitle>
        <MainContentCards>
          {posts.map((post, idx) => {
            const isLast = idx === posts.length - 1;
            return isLast ? (
              <div id="last" key={post.id}>
                <Card post={post} width={288} space={20} />
              </div>
            ) : (
              <Card post={post} width={288} space={20} key={post.id} />
            );
          })}
        </MainContentCards>
      </MainContents>
    </MainPageContainer>
  );
}

export default Main;

const MainPageContainer = styled.div`
  padding-top: 150px;
  ${flexCenter}
  flex-direction:column;
  color: ${theme.deepGrey};
  background-color: ${theme.background};
`;

const MainBanner = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;

  .bannerImg {
    width: 630px;
    height: 340px;
    background: url("/Images/banner.jpg");
    border-radius: 20px;
  }
`;

const BannerContent = styled.div`
  width: 35%;
  padding: 10px 0 0 75px;
  display: flex;
  flex-direction: column;
  font-family: ${theme.fontTitle};
  font-weight: 600;

  .greeting {
    font-size: 39px;
    color: ${theme.orange};
  }

  .title {
    font-size: 35px;
  }

  p {
    margin-top: 140px;
    line-height: 30px;
    font-size: 20px;
    font-weight: 300;
    font-family: ${theme.fontContent};
  }

  .moreBtn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    border: none;
    outline: none;
    font-size: 17px;
    background-color: transparent;
    color: ${theme.orange};
    cursor: pointer;
  }
`;

const MainContents = styled.div`
  width: 90%;
  max-width: 1450px;
  padding: 50px 0;
  margin-top: 55px;
  position: relative;
  background-color: ${theme.white};
  border-radius: 50px;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.05);
`;

const MainContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px;

  .titleContainer {
    display: flex;
    align-items: center;

    .check {
      margin-right: 10px;
      color: ${theme.orange};
    }

    .contentTitle {
      font-size: 23px;
      font-weight: 600;
    }
  }

  .selectNth {
    font-size: 18px;
    cursor: pointer;

    .btn {
      color: ${theme.orange};
    }
  }
`;

const MainContentCards = styled.div`
  margin-top: 40px;
  padding: 0px !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
