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
      <Wrap>
        {dayPosts[day].map((post) => {
          return <MiniPostCard post={post} />;
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
  display:flex;
  right: 0;


  div {
    width: 230px;
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

const Wrap = styled.div`
  height: 500px;
  overflow-y: scroll;

  /* ::-webkit-scrollbar {
    width: 5px;
    height: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.yellow};
    border-radius: 10px;
  } */
`;
