import React, { useState, useEffect } from "react";
import DayColumn from "./DayColumn";
import styled from "styled-components";
import axios from "axios";
import theme, { flexCenter } from "../../Styles/Theme";
import Calendar from "react-calendar";
import { API_URL } from "../../config";
import "react-calendar/dist/Calendar.css";

function PostsOfTheWeek() {
  const [dayPosts, setdayPosts] = useState([]);
  const [calender, setCalender] = useState(false);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    axios.get(`${API_URL}/mygroup`).then((res) => {
      setdayPosts(res.data.by_days);
    });
  }, []);

  // useEffect(() => {
  //   axios.post(``, {});
  // });

  const handleShowCalendar = () => {
    setCalender(!calender);
  };

  return (
    <Container>
      <CalendarContainer>
        {calender && <Calendar onChange={onChange} value={value} />}
      </CalendarContainer>
      <MonthOfTheWeek onClick={handleShowCalendar}>
        <span>
          August<span className="moreBtn">▾</span>
        </span>
        <span className="week">2nd week</span>
      </MonthOfTheWeek>
      <DayColumns>
        {Object.keys(dayPosts).map((day) => {
          return <DayColumn day={day} dayPosts={dayPosts} />;
        })}
      </DayColumns>
    </Container>
  );
}

export default PostsOfTheWeek;

const Container = styled.div`
  height: 560px;
  margin-top: 28px;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  background-color: ${theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 35px;
`;

const CalendarContainer = styled.div`
  z-index: 999;
  @keyframes showBox {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  .react-calendar {
    width: 300px;
    height: 324px;
    ${flexCenter}
    flex-direction:column;
    position: absolute;
    margin: 120px 0 0 40px;
    overflow: hidden;
    animation: showBox 0.5s;
    background-color: white;
    border: none;
    border-radius: 18px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.07),
      0px 24px 48px rgba(0, 0, 0, 0.05);
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__tile--active {
    background: #f2994a;
    color: white;
  }

  .react-calendar__tile--hasActive {
    background: #f2994a;
  }

  .react-calendar__tile--now {
    background: rgba(242, 153, 74, 0.6);
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #f2994a;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #f2994a;
  }
`;

const MonthOfTheWeek = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  font-size: 30px;
  z-index: 2;

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

const DayColumns = styled.div`
  display: flex;
  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.yellow};
    border-radius: 10px;
  }
`;
