import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import MiniPostCard from "./MiniPostCard";

function DayColumn({ day, dayPosts, hideCalendar }) {
  return (
    <DayColumnContainer onClick={hideCalendar}>
      <DayOfTheWeek day={day}>
        <div>
          <span>{day}</span>
        </div>
      </DayOfTheWeek>
      <Wrap>
        {dayPosts[day].map((post, i) => {
          return <MiniPostCard post={post} key={i} />;
        })}
      </Wrap>
    </DayColumnContainer>
  );
}

export default DayColumn;

const DayColumnContainer = styled.div`
  margin-top: 43px;
`;

const DayOfTheWeek = styled.div`
  display: flex;
  right: 0;

  div {
    width: 230px;
    height: 37px;
    margin-left: 5px;
    ${flexCenter}
    background-color:${(props) =>
      props.day === "SUN" ? `${theme.orange}` : `${theme.grey}`};
    color: ${(props) => props.day === "SUN" && `${theme.white}`};
    border-radius: 17px;
  }
  .flex {
    display: flex;
    flex-direction: row;
  }
`;

const Wrap = styled.div`
  height: 500px;
  margin-top: 20px;
  overflow-y: scroll;
`;
