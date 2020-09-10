import React, { useEffect } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../Styles/Theme";

const Alert = ({
  alertMessage,
  setSelectedMenu,
  selectedMenu,
  setActiveAlert,
  excuteFunction,
  submitBtn,
  closeBtn,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleExecuteFunction = () => {
    excuteFunction();
    setActiveAlert(false);
  };

  return (
    <Wrap>
      <AlertContainer>
        <span className="alertMessage">{alertMessage}</span>
        <div className="btnContainer">
          <button
            onClick={() => {
              setActiveAlert(false);
              selectedMenu === "로그아웃" && setSelectedMenu("");
            }}
            className="closeBtn"
          >
            {closeBtn}
          </button>
          <button onClick={handleExecuteFunction} className="submitBtn">
            {submitBtn}
          </button>
        </div>
      </AlertContainer>
    </Wrap>
  );
};

export default Alert;

const Wrap = styled.div`
  height: 100%;
  top: 0;
  right: 0;
  left: 0%;
  position: fixed;
  ${flexCenter};
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const AlertContainer = styled.div`
  width: 400px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.white};
  border-radius: 15px;
  box-shadow: 0 20px 75px rgba(0, 0, 0, 0.13);
  z-index: 10;

  .alertMessage {
    font-size: 14px;
    font-family: ${theme.fontContent};
    color: ${theme.fontColor};
  }

  .btnContainer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  button {
    width: 50px;
    height: 30px;
    margin-right: 10px;
    border: none;
    outline: none;
    border-radius: 8px;
    background-color: ${theme.orange};
    color: ${theme.white};
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }
`;
