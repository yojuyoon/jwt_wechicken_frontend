import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Card from "../../Components/Card/Card";
import MainBanner from "./MainBanner";
import Alert from "../../Components/Alert";
import Login from "../../Components/Login/Login";
import usePagination from "../../hooks/usePagination";
import { API_URL } from "../../config";
import { POSTS_LIMIT } from "../../constants";
import theme, { flexCenter, MainContentCards } from "../../Styles/Theme";

function Main() {
  const [posts, setPosts] = useState([]);
  const [isActiveAlert, setActiveAlert] = useState(false);
  const [isLoginActive, setLoginActive] = useState(false);
  const ref = useRef(null);
  const [page, _] = usePagination(ref.current);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_URL}/main?page=${page}&size=${POSTS_LIMIT}`,
        sessionStorage.getItem("USER") && {
          headers: {
            Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
          },
        }
      );
      setPosts((prevState) => [...prevState, ...res.data.posts]);
    };

    fetchData();
  }, [page]);

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
        <MainBanner setActiveAlert={setActiveAlert} />
        <MainContents>
          <MainContentTitle>
            <div className="titleContainer">
              <FontAwesomeIcon className="check" icon={faCheck} />
              <h1 className="contentTitle">트렌딩 포스트</h1>
            </div>
          </MainContentTitle>
          <MainContentCards>
            {posts.map((post) => (
              <Card
                key={post.id}
                post={post}
                width={288}
                space={20}
                setActiveAlert={setActiveAlert}
              />
            ))}
            <div ref={ref} style={{ height: "10px" }} />
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
