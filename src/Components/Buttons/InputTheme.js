import React from "react";
import styled from "styled-components";
import theme from "../../Styles/Theme";

const InputTheme = ({ width, type, value, handleType }) => {
  return (
    <Container width={width}>
      <div className="nameBox">
        <div className="type">{type}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleType(e.target.value)}
        ></input>
      </div>
    </Container>
  );
};

export default React.memo(InputTheme);

const Container = styled.div`
margin: 10px 0;

   .nameBox {
    padding-left: 12px;
    padding-bottom: 2px;

    .type {
      margin-left: 5px;
      margin-bottom: 2px;
      font-size: 11px;
      line-height: 13px;
      color: #8a8383;
    }

    input {
      width: ${({ width }) => width}px;
      height: 28px;
      border: none;
      border-radius: 28px;
      background-color: ${theme.yellow};
      outline: none;
      cursor: text;
    }
`;
