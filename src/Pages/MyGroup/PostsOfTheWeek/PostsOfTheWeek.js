import React, { useState } from "react";
import DayColumn from "./DayColumn";
import styled, { css } from "styled-components";
import MyGroupJoinModal from "./MyGroupJoinModal";
import Alert from "../../../Components/Alert";
import theme, { flexCenter } from "../../../Styles/Theme";

function PostsOfTheWeek({ dayPosts, isGroupJoined, excuteFunction }) {
  const [isActiveAlert, setActiveAlert] = useState(false);

  return (
    <Wrap>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage={"치킨계에 가입하시겠습니까?"}
          excuteFunction={excuteFunction}
          submitBtn={"가입"}
          closeBtn={"취소"}
        />
      )}
      {!isGroupJoined && <MyGroupJoinModal setActiveAlert={setActiveAlert} />}
      <Container isGroupJoined={isGroupJoined}>
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
  margin: 24px 2vw 0;
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  background-color: ${theme.white};
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.08);
  border-radius: 35px;

  ::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    !props.isGroupJoined &&
    css`
      filter: blur(4px);
    `}
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
  z-index: 1;
`;
