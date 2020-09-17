import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../config";
import Contributors from "./Contributors/Contributors";
import PostsOfTheWeek from "./PostsOfTheWeek/PostsOfTheWeek";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import MyGroupBanner from "./MyGroupBanner";
import theme from "../../Styles/Theme";
import BtnTheme from "../../Components/Buttons/BtnTheme";
import {
  myGroupTitle,
  myGroupTitleStatus,
} from "../../store/actions/myGroupTitleAction";
import { useDispatch } from "react-redux";
import Customcalendar from "./CustomCalendar";

const MyGroup = () => {
  const [isGroupJoined, setIsGroupJoined] = useState(true);
  const [dayPosts, setdayPosts] = useState([]);
  const [contributor, setContributor] = useState([]);
  const [myContribution, setMyContribution] = useState({});
  const [ranking, setRanking] = useState([]);
  const [postsCounting, setPostCounting] = useState({});
  const [myGroup, setMyGroup] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMyGroupStatus();
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(myGroupTitleStatus(true));
    return () => {
      dispatch(myGroupTitleStatus(false));
    };
    //eslint-disable-next-line
  }, []);

  const fetchMyGroupStatus = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/mygroup`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      });
      console.log(res);
      const {
        Ranks,
        is_group_joined,
        by_days,
        users,
        myProfile,
        userPostsCounting,
        myGroup,
      } = res.data;
      setRanking(Ranks);
      setIsGroupJoined(is_group_joined);
      setdayPosts(by_days);
      setContributor(users);
      setMyContribution(myProfile);
      setPostCounting(userPostsCounting);
      setMyGroup(myGroup);
      dispatch(myGroupTitle(myGroup.title));
    } catch (e) {
      setIsError(true);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  console.log("확인", myContribution.blog_type);

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
        const {
          Ranks,
          is_group_joined,
          by_days,
          users,
          myProfile,
          userPostsCounting,
          myGroup,
        } = res.data;
        setRanking(Ranks);
        setIsGroupJoined(is_group_joined);
        setdayPosts(by_days);
        setContributor(users);
        setMyContribution(myProfile);
        setPostCounting(userPostsCounting);
        setMyGroup(myGroup);
        dispatch(myGroupTitle(myGroup.title));
      });
  };

  const handleUpdateBtn = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${API_URL}/mygroup/update`,
        {},
        {
          headers: {
            Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
          },
        }
      );
      setdayPosts(res.data.by_days);
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
      <MyGroupBanner ranking={ranking} />
      <ContentWrap>
        <ThisWeek>
          <div className="headerBox">
            <div className="title">이주의 포스팅</div>
            <Customcalendar setdayPosts={setdayPosts} />
            <div className="btnUpdate" onClick={() => handleUpdateBtn()}>
              {/* {isGroupJoined && <BtnTheme value={"업데이트"} />} */}
              {isGroupJoined &&
                (myContribution.blog_type === "velog" ? (
                  <BtnTheme value={"업데이트"} />
                ) : (
                  <BtnTheme value={"포스트 ➕"} />
                ))}
            </div>
          </div>
          <PostsOfTheWeek
            excuteFunction={handleGroupJoined}
            isGroupJoined={isGroupJoined}
            dayPosts={dayPosts}
          />
        </ThisWeek>
        {isGroupJoined && (
          <Contribution>
            <div className="headerBox">
              <div className="title">이주의 공헌</div>
            </div>
            <Contributors
              myGroup={myGroup}
              postsCounting={postsCounting}
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
  padding-top: 111px;
  background-color: ${theme.background};
`;

const ContentWrap = styled.div`
  margin: 100px 3vw 0 3vw;
  display: flex;
  flex-direction: column;
`;

const ThisWeek = styled.div`
  width: 100%;

  .headerBox {
    display: flex;
    width: 100%;
    padding: 0 4vw;
    margin: 0 auto;
    position: relative;
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

  .btnUpdate {
    margin-left: 20px;
  }
`;

const Contribution = styled.div`
  width: 100%;
  margin: 40px 0;

  .headerBox {
    display: flex;
    width: 100%;
    padding: 0 4vw;
    margin: 0 auto;
    position: relative;
  }

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
