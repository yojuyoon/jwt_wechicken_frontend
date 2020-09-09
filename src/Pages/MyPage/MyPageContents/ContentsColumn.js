import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import EditForm from "./Components/EditForm";
import OptInOrOutBtn from "./Components/OptInOrOutBtn";
import Alert from "../../../Components/Alert";
import theme, { flexCenter } from "../../../Styles/Theme";
import { API_URL } from "../../../config";

function ContentsColumn({ item, myProfile }) {
  const [selected, setSelected] = useState({});
  const [isEdit, setisEdit] = useState(false);
  const [contentValue, setContentValue] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isActiveAlert, setActiveAlert] = useState(false);

  useEffect(() => {
    setIsJoined(myProfile.is_group_joined);
  }, [myProfile]);

  useEffect(() => {
    setContentValue(myProfile.blog_address);
  }, [myProfile.blog_address]);

  const activeEditForm = () => {
    setisEdit(!isEdit);
  };

  const handleContentValue = (e) => {
    setContentValue(e.target.value);
  };

  const handleSubmit = (e) => {
    setisEdit(!isEdit);
    modifyBlogUrl();
    e.preventDefault();
  };

  const modifyBlogUrl = () => {
    axios.post(
      `${API_URL}/mypage`,
      { blog_address: contentValue },
      {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      }
    );
  };

  const handleRemoveGroup = () => {
    axios({
      method: "post",
      url: `${API_URL}/mypage?leave=group`,
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
      },
    }).then(() => setIsJoined(false));
  };

  const contentArea = {
    my_blog: (
      <>
        {isEdit ? (
          <EditForm
            contentValue={contentValue}
            handleContentValue={handleContentValue}
            handleSubmit={handleSubmit}
            item={item}
          />
        ) : (
          <>
            <span className="item">{contentValue}</span>
            <button onClick={activeEditForm} className="editBtn">
              수정
            </button>
          </>
        )}
      </>
    ),
    email_address: <span className="item">{myProfile.gmail}</span>,
    opt_in_or_out: (
      <OptInOrOutBtn
        selected={selected}
        toggleSelected={() => {
          setSelected(!selected);
        }}
      />
    ),
    withdrawal: (
      <WithdrawalBtn
        isJoined={isJoined}
        onClick={() => isJoined && setActiveAlert(true)}
      >
        치킨계 탈퇴
      </WithdrawalBtn>
    ),
  };

  return (
    <>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage={"치킨계를 탈퇴하시겠습니까?"}
          excuteFunction={handleRemoveGroup}
          submitBtn={"탈퇴"}
          closeBtn={"취소"}
        />
      )}
      <ContentsColumnContainer>
        <div className="wrapper">
          <h3 className="title">{item.title}</h3>
          <div>{contentArea[item.id]}</div>
        </div>
        <span className="description">{item.description}</span>
      </ContentsColumnContainer>
    </>
  );
}

export default ContentsColumn;

const ContentsColumnContainer = styled.div`
  width: 950px;
  height: 107px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .wrapper {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    div {
      width: 800px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 18px;
        color: ${theme.deepGrey};
      }

      .editBtn {
        ${flexCenter};
        font-size: 16px;
        font-weight: 400;
        color: ${theme.orange};
        background-color: transparent;
        border: none;
      }
    }
  }

  .title {
    width: 200px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: ${theme.orange};
  }

  .description {
    font-size: 13px;
    color: ${theme.deepGrey};
  }
`;

const WithdrawalBtn = styled.button`
  width: 100px;
  height: 33px;
  border: none;
  ${flexCenter};
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  outline: none;
  cursor: ${({ isJoined }) =>
    isJoined ? "pointer" : "not-allowed"} !important;
  color: ${({ isJoined }) => (isJoined ? theme.white : "#767676")};
  background-color: ${(props) => (props.isJoined ? theme.vermilion : "#eee;")};

  &:hover {
    opacity: 0.8;
  }
`;
