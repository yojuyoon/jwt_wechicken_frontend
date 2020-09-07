import React, { useState } from "react";
import DayColumn from "./DayColumn";
import styled, { css } from "styled-components";
import Calendar from "react-calendar";
import MyGroupJoinModal from "./MyGroupJoinModal";
import theme, { flexCenter } from "../../Styles/Theme";
import "react-calendar/dist/Calendar.css";

function PostsOfTheWeek({ dayPosts, isGroupJoined, submit }) {
  const [calender, setCalender] = useState(false);
  const [value, onChange] = useState(new Date());

  const handleShowCalendar = () => {
    setCalender(!calender);
  };

  return (
    <Wrap>
      {!isGroupJoined && <MyGroupJoinModal submit={submit} />}
      <Container isGroupJoined={isGroupJoined}>
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
          {Object.keys(dayPosts).map((day, i) => {
            return <DayColumn day={day} dayPosts={dayPosts} key={i} />;
          })}
        </DayColumns>
      </Container>
      {!isGroupJoined && <ModalBackground />}
    </Wrap>
  );
}

export default PostsOfTheWeek;

const Wrap = styled.div`
  position: relative;
  ${flexCenter};
`;

const Container = styled.div`
  height: 560px;
  margin-top: 28px;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  background-color: ${theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 35px;
  ${(props) =>
    !props.isGroupJoined &&
    css`
      filter: blur(4px);
    `}
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

const ModalBackground = styled.div`
  width: 101%;
  height: 100%;
  position: absolute;
  border-radius: 35px;
  background-color: ${theme.white};
  opacity: 0.5;
  z-index: 10;
`;
