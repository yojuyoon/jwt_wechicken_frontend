import React, { useState, useEffect } from "react";
import DayColumn from "./DayColumn";
import styled from "styled-components";
import axios from "axios";
import theme from "../../Styles/Theme";
import Calendar from "react-calendar";

function PostsOfTheWeek() {
  const [dayPosts, setdayPosts] = useState([]);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/medium.json")
      .then((res) => setdayPosts(res.data));
  }, []);

  const showCalendar = () => {
    return (
      <div className="calender">
        <Calendar onChange={onChange} value={value} />
      </div>
    );
  };

  return (
    <PostsOfTheWeekContainer>
      <MonthOfTheWeek onClick={showCalendar}>
        <span>
          August<span className="moreBtn">▾</span>
        </span>
        <span className="week">2nd week</span>
      </MonthOfTheWeek>
      {Object.keys(dayPosts).map((day) => {
        return <DayColumn day={day} dayPosts={dayPosts} />;
      })}
    </PostsOfTheWeekContainer>
  );
}

export default PostsOfTheWeek;

const PostsOfTheWeekContainer = styled.div`
  min-height: 600px;
  margin-top: 30px;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  background-color: ${theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 35px;

  .calender {
    width: 100px;
    background-color: red;
  }
`;

const MonthOfTheWeek = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  font-size: 30px;

  span {
    cursor: pointer;
  }

  .moreBtn {
    margin-left: 8px;
    font-size: 20px;
    text-align: center;
    color: ${theme.orange};
  }

  .week {
    margin: 8px 0 0 0px;
    font-size: 17px;
    color: ${theme.deepGrey};
  }
`;
