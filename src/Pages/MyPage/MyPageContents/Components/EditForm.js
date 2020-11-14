import React from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../../Styles/Theme";

function EditForm({ handleSubmit, contentValue, handleContentValue }) {
  return (
    <EditFormContainer onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder="블로그 주소"
          className="editblogUrl"
          value={contentValue}
          onChange={handleContentValue}
        />
        <input type="submit" className="saveBtn" value="저장" />
      </label>
    </EditFormContainer>
  );
}

export default EditForm;

const EditFormContainer = styled.form`
  label {
    display: flex;
    align-items: center;

    .editblogUrl {
      width: 200px;
      height: 35px;
      font-size: 19px;
      outline: none;
      border: none;
      border-bottom: 1px solid ${theme.orange};
      color: ${theme.deepGrey};
    }

    .saveBtn {
      width: 65px;
      height: 40px;
      ${flexCenter};
      font-size: 16px;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: transparent;
      color: ${theme.orange};
      cursor: pointer;
    }
  }
`;
