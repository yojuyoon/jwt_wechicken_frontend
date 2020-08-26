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
    width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .editblogUrl {
      width: 75%;
      height: 35px;
      font-size: 16px;
      font-weight: 400;
      text-indent: 10px;
      border: 1px solid ${theme.grey};
      border-radius: 4px;
      color: ${theme.deepGrey};
    }

    .saveBtn {
      width: 60px;
      height: 30px;
      ${flexCenter};
      font-size: 16px;
      border: none;
      border-radius: 5px;
      color: ${theme.white};
      background-color: ${theme.orange};
    }
  }
`;
