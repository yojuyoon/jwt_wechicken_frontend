import React from "react";
import styled from "styled-components";
// import MiniPostCard from "./MiniPostCard";
import theme, { flexCenter } from "../../Styles/Theme";
import MiniPostCard from "./MiniPostCard";

function DayColumn({ day, dayPosts }) {
  return (
    <DayColumnContainer>
      <DayOfTheWeek>
        <div>
          <span>{day}</span>
        </div>
      </DayOfTheWeek>
      {dayPosts[day].map((post) => {
        return <MiniPostCard post={post} />;
      })}
    </DayColumnContainer>
  );
}

export default DayColumn;

const DayColumnContainer = styled.div`
  margin-top: 43px;
`;

const DayOfTheWeek = styled.div`
  display:flex;
  right: 0;
  div {
    width: 190px;
    height: 37px;
    margin-left: 5px;
    ${flexCenter}
    background-color: ${theme.grey};
    border-radius: 17px;
  }
  .flex{
    display:flex;
    flex-direction:row;
  }
`;
