import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Card from "../../Components/Card/Card";
import theme, { flexCenter } from "../../Styles/Theme";
import { API_URL } from "../../config";

function Main() {
  const [isNthDropdownOpen, setNthDropdownOpen] = useState(false);
  const [selectedNth, setSelectedNth] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/main`).then((res) => {
      setPosts(res.data.posts);
    });
  }, []);

  const handleSelectedNth = (e) => {
    setNthDropdownOpen(false);
    setSelectedNth(e.target.innerText);
  };

  const nthNumber = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const nthList = nthNumber.map((list) => (
    <li
      key={list}
      onClick={handleSelectedNth}
      className={selectedNth === `${list}기` ? "focused" : undefined}
    >
      {list}기
    </li>
  ));

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
          <div
            onClick={() => setNthDropdownOpen(!isNthDropdownOpen)}
            className="selectNth"
          >
            <span>
              기수별 <span className="btn">▾</span>
            </span>
          </div>
          {isNthDropdownOpen && (
            <>
              <NthDropdown selectedNth={selectedNth}>
                <ul>{nthList}</ul>
              </NthDropdown>
            </>
          )}
        </MainContentTitle>
        <MainContentCards>
          {posts.map((post, i) => {
            return <Card post={post} key={i} />;
          })}
          {/* <Card /> */}
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

const NthDropdown = styled.div`
  width: 100px;
  height: 200px;
  right: 50px;
  top: 80px;
  display: flex;
  flex-direction: column;
  padding: 8px 0px;
  position: absolute;
  overflow: hidden;
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 4;

  li {
    height: 30px;
    ${flexCenter};
    cursor: pointer;
  }

  li:hover {
    font-weight: 900;
    color: ${theme.orange};
  }

  .focused {
    font-weight: 900;
    color: ${theme.orange};
  }
`;
