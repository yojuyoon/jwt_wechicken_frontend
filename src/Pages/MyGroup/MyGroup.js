import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../config";
import Contributors from "./Contributors/Contributors";
import PostsOfTheWeek from "./PostsOfTheWeek/PostsOfTheWeek";
import Loading from "../../Components/Common/Loading";
import Error from "../../Components/Common/Error";
import MyGroupBanner from "./MyGroupBanner";
import theme, { HeaderBox } from "../../Styles/Theme";
import BtnTheme from "../../Components/Buttons/BtnTheme";
import {
  myGroupTitle,
  myGroupTitleStatus,
} from "../../store/actions/myGroupTitleAction";
import { useDispatch } from "react-redux";
import Customcalendar from "./CustomCalendar";
import AddPostModal from "./AddPost/AddPostModal";

const MyGroup = () => {
  const [isGroupJoined, setIsGroupJoined] = useState(true);
  const [dayPosts, setdayPosts] = useState([]);
  const [contributor, setContributor] = useState([]);
  const [myContribution, setMyContribution] = useState({});
  const [ranking, setRanking] = useState([]);
  const [postsCounting, setPostCounting] = useState({});
  const [myGroup, setMyGroup] = useState({});
  const [isAddModalActive, setAddModalActive] = useState(false);
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

  const handleMyGroupPageData = (res) => {
    setRanking(res.data.Ranks);
    setIsGroupJoined(res.data.is_group_joined);
    setdayPosts(res.data.by_days);
    setContributor(res.data.users);
    setMyContribution(res.data.myProfile);
    setPostCounting(res.data.userPostsCounting);
    setMyGroup(res.data.myGroup);
    dispatch(myGroupTitle(res.data.myGroup.title));
  };

  const fetchMyGroupStatus = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/mygroup`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      });
      handleMyGroupPageData(res);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
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
        handleMyGroupPageData(res);
      });
  };
  // 서버 문제로 잠시 기능 중지
  // const handleUpdateBtn = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post(
  //       `${API_URL}/mygroup/update`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
  //         },
  //       }
  //     );
  //     handleMyGroupPageData(res);
  //   } catch (e) {
  //     setIsError(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Container>
      {isAddModalActive && (
        <AddPostModal
          name={myContribution.name}
          closeModal={setAddModalActive}
          handleMyGroupPageData={handleMyGroupPageData}
        />
      )}
      <MyGroupBanner ranking={ranking} />
      <ContentWrap>
        {isGroupJoined && (
          <Contribution>
            <HeaderBox width={128}>
              <div className="title">이주의 공헌</div>
            </HeaderBox>
            <Contributors
              myGroup={myGroup}
              postsCounting={postsCounting}
              myContribution={myContribution}
              contributor={contributor}
            />
          </Contribution>
        )}
        <ThisWeek>
          <HeaderBox width={149}>
            <div className="title">이주의 포스팅</div>
            <Customcalendar
              setdayPosts={setdayPosts}
              setPostCounting={setPostCounting}
            />
            <div className="btnUpdate">
              {isGroupJoined && (
                <BtnTheme
                  value={"포스트 +"}
                  handleFunction={() => {
                    setAddModalActive(true);
                  }}
                />
              )}
            </div>
          </HeaderBox>
          <PostsOfTheWeek
            excuteFunction={handleGroupJoined}
            isGroupJoined={isGroupJoined}
            dayPosts={dayPosts}
          />
        </ThisWeek>
      </ContentWrap>
    </Container>
  );
};

export default MyGroup;

const Container = styled.div`
  padding-top: 150px;
  margin-bottom: 70px;
  background-color: ${theme.background};
`;

const ContentWrap = styled.div`
  margin: 50px 3vw 0 3vw;
  display: flex;
  flex-direction: column;
`;

const ThisWeek = styled.div`
  .btnUpdate {
    display: flex;
    margin-left: 20px;
  }
`;

const Contribution = styled.div`
  margin: 100px 0;
`;
