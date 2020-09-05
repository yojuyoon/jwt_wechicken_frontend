import React from "react";
import styled from "styled-components";

const InputTheme = ({ width, type, value, handleType, placeholder }) => {
  return (
    <Container width={width}>
      <div className="nameBox">
        <div className="type">{type}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleType(e.target.value)}
          placeholder={placeholder}
        />
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
      margin-left: 2px;
      margin-bottom: 2px;
      font-weight: 500;
      font-size: 11px;
      color: #8a8383;
    }

    input {
      width: ${({ width }) => width}px;
      height: 28px;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      outline: none;
      cursor: text;
      caret-color: #ff7425;
    }
    input::placeholder {
      font-size: 11px;
      opacity: 0.7;
    }
  }
`;
