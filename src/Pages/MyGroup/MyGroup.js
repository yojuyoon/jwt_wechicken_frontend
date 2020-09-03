import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../config";
import { confirmAlert } from "react-confirm-alert";
import Contributors from "./Contributors/Contributors";
import PostsOfTheWeek from "../../Components/PostsOfTheWeek/PostsOfTheWeek";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import theme from "../../Styles/Theme";
import BtnTheme from "../../Components/Buttons/BtnTheme";
import "react-confirm-alert/src/react-confirm-alert.css";

const MyGroup = () => {
  const [isGroupJoined, setIsGroupJoined] = useState(true);
  const [dayPosts, setdayPosts] = useState([]);
  const [contributor, setContributor] = useState([]);
  const [myContribution, setMyContribution] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getMyGroupStatus();
  }, []);

  const getMyGroupStatus = async () => {
    try {
      const res = await axios.get(`${API_URL}/mygroup`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      });
      setIsGroupJoined(res.data.is_group_joined);
      setdayPosts(res.data.by_days);
      setContributor(res.data.users);
      setMyContribution(res.data.myProfile);
    } catch (e) {
      setIsError(true);
    }
  };

  const submit = () => {
    confirmAlert({
      message: "치킨계에 가입하시겠습니까?",
      buttons: [
        {
          label: "취소",
        },
        {
          label: "가입",
          onClick: () => handleGroupJoined(),
        },
      ],
    });
  };

  const handleGroupJoined = () => {
    axios
      .post(
        `${API_URL}/mygroup/join`,
        {},
        {
          headers: {
            Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
          },
        }
      )
      .then((res) => {
        setIsGroupJoined(res.data.is_group_joined);
        setdayPosts(res.data.by_days);
        setContributor(res.data.users);
        setMyContribution(res.data.myProfile);
      });
  };

  const handleUpdateBtn = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: "post",
        url: `${API_URL}/mygroup/update`,
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      });
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Container>
      <HallFrame>
        <img alt="chicken_bong" src="/Images/chicken.png" />
      </HallFrame>
      <ContentWrap>
        <ThisWeek>
          <div className="headerBox">
            <div className="title">이주의 포스팅</div>
            <div onClick={() => handleUpdateBtn()}>
              {isGroupJoined && <BtnTheme value={"업데이트"} />}
            </div>
          </div>
          <PostsOfTheWeek
            submit={submit}
            isGroupJoined={isGroupJoined}
            dayPosts={dayPosts}
          />
        </ThisWeek>
        {isGroupJoined && (
          <Contribution>
            <div className="title">이주의 공헌</div>
            <Contributors
              myContribution={myContribution}
              contributor={contributor}
            />
          </Contribution>
        )}
      </ContentWrap>
    </Container>
  );
};

export default MyGroup;

const Container = styled.div`
  padding: 0 81px;
  padding-top: 111px;
  background-color: ${theme.background};
`;

const HallFrame = styled.div`
  height: 380px;
  margin: 36px auto 0px;
  padding: 70px;
  border-radius: 34px;
  background-color: ${theme.yellow};
  display: flex;
  align-items: center;

  img {
    width: 200px;
    height: 200px;
    background: none;
  }
`;

const ContentWrap = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

const ThisWeek = styled.div`
  width: 80%;

  .headerBox {
    display: flex;
  }

  .title {
    width: 146px;
    margin-right: 20px;
    padding-bottom: 3px;
    font-family: ${theme.fontContent};
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    border-bottom: 4px solid ${theme.orange};
  }
`;

const Contribution = styled.div`
  width: 250px;
  margin-left: 60px;

  .title {
    width: 123px;
    padding-bottom: 3px;
    font-family: ${theme.fontContent};
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    border-bottom: 4px solid ${theme.orange};
  }
`;
