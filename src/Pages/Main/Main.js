import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Card from "../../Components/Card/Card";
import theme, { flexCenter } from "../../Styles/Theme";
import { API_URL } from "../../config";
import usePagination from "../../hooks/usePagination";
import MainBanner from "./MainBanner";
import Alert from "../../Components/Alert";
import Login from "../../Components/Login/Login";

function Main() {
  const [posts, setPosts] = useState([]);
  const [target, setTarget] = useState("");
  const [page, setPage] = useState(0);
  const [isActiveAlert, setActiveAlert] = useState(false);
  const [isLoginActive, setLoginActive] = useState(false);

  const SIZE = 24;

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleSetLoginActive = () => {
    setLoginActive(true);
  };

  return (
    <>
      {isLoginActive && <Login setModalOn={setLoginActive} />}
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage={"로그인이 필요한 서비스입니다."}
          excuteFunction={handleSetLoginActive}
          submitBtn={"로그인"}
          closeBtn={"취소"}
        />
      )}
      <MainPageContainer>
        <MainBanner />
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
                  <Card
                    post={post}
                    width={288}
                    space={20}
                    setActiveAlert={setActiveAlert}
                  />
                </div>
              ) : (
                <Card
                  post={post}
                  width={288}
                  space={20}
                  key={post.id}
                  setActiveAlert={setActiveAlert}
                />
              );
            })}
          </MainContentCards>
        </MainContents>
      </MainPageContainer>
    </>
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

const MainContents = styled.div`
  width: 90%;
  max-width: 1450px;
  padding: 50px 0;
  margin-top: 55px;
  position: relative;
  background-color: ${theme.white};
  border-radius: 50px;
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.05);

  @media (max-width: 800px) {
    margin-top: 0px;
  }
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
      font-family: ${theme.fontContent};
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
