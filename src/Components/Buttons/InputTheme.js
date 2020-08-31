import React from "react";
import styled from "styled-components";

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
margin: 5px 0;

   .nameBox {
    padding-left: 12px;
    padding-bottom: 2px;

    .type {
      margin-left: 5px;
      margin-bottom: 2px;
      font-weight: 500;
      font-size: 10px;
      color: #8A8383;
    }

    input {
      width: ${({ width }) => width}px;
      height: 28px;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);    
      outline: none;
      cursor: text;
      caret-color: #FF7425;
    }
`;
