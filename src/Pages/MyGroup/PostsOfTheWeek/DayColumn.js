import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../Styles/Theme";
import MiniCard from "../../../Components/Card/MiniCard";

function DayColumn({ day, dayPosts, hideCalendar }) {
  return (
    <DayColumnContainer onClick={hideCalendar}>
      <DayOfTheWeek day={day}>
        <div>
          <span>{day}</span>
        </div>
      </DayOfTheWeek>
      <Wrap>
        {dayPosts[day]
          .sort((a, b) => b.id - a.id)
          .map((post, i) => {
            return <MiniCard post={post} key={i} />;
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
    width: 175px;

    height: 37px;
    margin: 0 5px;
    ${flexCenter}
    background-color:${(props) =>
      props.day === "SUN" ? `${theme.orange}` : `${theme.grey}`};
    color: ${(props) => props.day === "SUN" && `${theme.white}`};
    border-radius: 17px;

    /* @media (min-width: 1450px) {
      width: 175px;
    } */

    /* @media (max-width: 400px) {
      width: 300px;
    } */
  }

  .flex {
    display: flex;
    flex-direction: row;
  }
`;

const Wrap = styled.div`
  height: 450px;
  margin-top: 20px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
