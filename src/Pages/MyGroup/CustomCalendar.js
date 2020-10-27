import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../../config";
import theme, { flexCenter } from "../../Styles/Theme";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({ setdayPosts, setPostCounting }) => {
  const currentDate = new Date();
  const [calender, setCalender] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const selectDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const formattedDate = String(10000 * yyyy + 100 * mm + dd);
    axios
      .get(`${API_URL}/mygroup/calendar/:${formattedDate}`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      })
      .then((res) => {
        setdayPosts(res.data.by_days);
        setPostCounting(res.data.userPostsCounting);
      })
      .then(setCurrentMonth(date.getMonth()))
      .then(setCurrentDay(date.getDate()))
      .then(setCalender(false));
  };

  return (
    <>
      <MonthOfTheWeek onClick={() => setCalender(!calender)}>
        <span className="moreBtn">▾</span>
        <span>
          {months[currentMonth]}
          <span className="week">{currentDay}일</span>
        </span>
      </MonthOfTheWeek>
      <CalendarContainer>
        {calender && <Calendar onClickDay={selectDate} />}
      </CalendarContainer>
    </>
  );
};

export default CustomCalendar;

const CalendarContainer = styled.div`
  z-index: 20;
  position: absolute;
  top: 60px;
  right: -12px;

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
  display: flex;
  margin-left: auto;
  align-items: flex-end;
  padding-bottom: 8px;
  font-size: 20px;

  span {
    cursor: pointer;
  }

  .moreBtn {
    margin-right: 8px;
    font-size: 20px;
    text-align: center;
    color: ${theme.orange};
  }

  .week {
    margin: 8px 0px 0px 8px;
    font-size: 15px;
    color: ${theme.deepGrey};
  }
`;
