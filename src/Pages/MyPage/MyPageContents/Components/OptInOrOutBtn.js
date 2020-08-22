import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../../Styles/Theme";

function OptInOrOutBtn({ selected, toggleSelected }) {
  return (
    <ToggleContainer selected={selected} onClick={toggleSelected}>
      <div className={`dialog-button ${selected ? "" : "disabled"}`}></div>
    </ToggleContainer>
  );
}

export default OptInOrOutBtn;

const ToggleContainer = styled.div`
  width: 32px !important;
  height: 14px !important;
  margin: 2px;
  position: relative;
  background-color: ${(props) =>
    props.selected ? `${theme.opacityOrange}` : `${theme.grey}`};
  border-radius: 7px;
  cursor: pointer;
  user-select: none;

  .dialog-button {
    width: 20px !important;
    height: 20px !important;
    position: absolute;
    left: 20px;
    ${flexCenter};
    border-radius: 50%;
    background-color: ${theme.orange};
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 0.25px 1px rgba(0, 0, 0, 0.039),
      0px 0.85px 3px rgba(0, 0, 0, 0.19);
  }

  .disabled {
    left: -8px;
    background-color: ${theme.white};
  }
`;
