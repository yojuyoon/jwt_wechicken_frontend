import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";

function BtnSubmit({ btnText, submitActivate, executeFunction }) {
  return (
    <Submit
      submitActivate={submitActivate}
      className="submit"
      onClick={() =>
        submitActivate
          ? executeFunction()
          : alert("필수 항목을 모두 채워주세요")
      }
    >
      <div className="SubmitBtn">{btnText}</div>
    </Submit>
  );
}

export default BtnSubmit;

const Submit = styled.div`
  width: 80px;
  margin-left: auto;
  margin-right: 20px;

  .SubmitBtn {
    ${flexCenter}
    height: 32px;
    border-radius: 1rem;
    cursor: ${({ submitActivate }) =>
      submitActivate ? "pointer" : "not-allowed"};
    color: ${({ submitActivate }) =>
      submitActivate ? theme.white : "#767676"};
    background-color: ${({ submitActivate }) =>
      submitActivate ? theme.orange : "#eee"};
  }
`;
