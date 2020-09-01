import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";
import axios from "axios";
import { API_URL } from "../../config";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Contributors from "./Contributors/Contributors";
import PostsOfTheWeek from "../../Components/PostsOfTheWeek/PostsOfTheWeek";
import Loading from "../../Components/Common/Loading";

const MyGroup = () => {
  const [isGroupJoined, setIsGroupJoined] = useState(true);
  const [dayPosts, setdayPosts] = useState([]);
  const [contributor, setContributor] = useState([]);
  const [myContribution, setMyContribution] = useState({})
  const [joinedMessage, setJoinedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   sessionStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ3ZWNvZGVfbnRoIjoxMCwiaWF0IjoxNTk4NzE0NjM3fQ.l9mY6ZBwg3UoJX0_JMKAQz3HsPCFw-obXKZz2aCJhFk")
  // })

  useEffect(() => {
    getMyGroupStatus();
  }, []);

  useEffect(() => {
    joinedMessage === "JOIN" && setIsGroupJoined(true);
  }, [joinedMessage])

  const getMyGroupStatus = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/mygroup`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token } })
      setIsGroupJoined(res.data.is_group_joined);
      setdayPosts(res.data.by_days);
      setContributor(res.data.users);
      setMyContribution(res.data.myProfile);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }

  const submit = () => {
    confirmAlert({
      message: '치킨계에 가입하시겠습니까?',
      buttons: [
        {
          label: '취소',
        },
        {
          label: '가입',
          onClick: () => handleGroupJoined()
        }
      ]
    })
  };

  const handleGroupJoined = () => {
    axios.post(`${API_URL}/mygroup/join`, {}, {
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token
      }
    }).then((res) => {
      setJoinedMessage(res.data.message)
    })
  }

  if (isLoading) return <Loading />;

  return (
    <Container>
      <HallFrame>
        <img alt="chicken_bong" src="/Images/chicken.png" />
      </HallFrame>
      <ContentWrap>
        <ThisWeek>
          <div className="title">이주의 포스팅</div>
          <PostsOfTheWeek submit={submit} isGroupJoined={isGroupJoined} dayPosts={dayPosts} />
        </ThisWeek>
        <Contribution>
          <div className="title">이주의 공헌</div>
          <Contributors myContribution={myContribution} contributor={contributor} />
        </Contribution>
      </ContentWrap>
    </Container>
  );
};

export default MyGroup;

const Container = styled.body`
  padding: 0 81px;
  padding-top: 111px;
`;

const HallFrame = styled.div`
  height: 304px;
  margin-top: 36px;
  padding: 70px;
  border-radius: 34px;
  background-color: ${theme.yellow};
  display: flex;
  align-items: center;

  img {
    width: 200px;
    height: 200px;
    background:none;
  }
`;

const ContentWrap = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
`;

const ThisWeek = styled.div`
  width: 80%;


  .title {
    width: 146px;
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
  margin-left: 20px;

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

