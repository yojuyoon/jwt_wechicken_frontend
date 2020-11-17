import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../../config";
import InputTheme from "../../../Components/Buttons/InputTheme";
import BtnSubmit from "../../../Components/Buttons/BtnSubmit";
import theme from "../../../Styles/Theme";
import axios from "axios";
import Dimmer from "../../../Components/Dimmer";

const AddPostModal = ({ name, closeModal, handleMyGroupPageData }) => {
  const [submitActivate, setSubmitActivate] = useState(false);
  const [isDateFormatCorrect, setDateFormatCorrect] = useState(undefined);
  const [values, setValues] = useState({
    title: "",
    link: "",
    date: "",
  });

  const handleInputValues = (value, name) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const fetchNewPost = () => {
    axios
      .post(`${API_URL}/mygroup/addpost`, values, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
        },
      })
      .then((res) => {
        res.statusText === "OK" && alert("성공적으로 추가 되었습니다.");
        handleMyGroupPageData(res);
        closeModal(false);
      });
  };

  // useEffect(() => {
  //   if (values.title && values.link) {
  //     if (values.date.length === 10 && values.date.split(".").length === 3) {
  //       setSubmitActivate(true);
  //     } else {
  //       setSubmitActivate(false);
  //     }
  //   }
  // }, [values.title, values.link, values.date]);

  useEffect(() => {
    values.title && values.link && isDateFormatCorrect
      ? setSubmitActivate(true)
      : setSubmitActivate(false);
  }, [values.title, values.link, isDateFormatCorrect]);

  useEffect(() => {
    if (values.date.length === 10 && values.date.split(".").length === 3) {
      if (values.date.replace(/\./g, "") <= dayjs().format("YYYYMMDD")) {
        setDateFormatCorrect(true);
      } 
    } else {
      setDateFormatCorrect(false);
    }
  }, [values.date]);

  return (
    <>
      <Dimmer />
      <Container>
        <Title>
          <img className="logoImage" alt="logo" src="/Images/logo.png" />
          <div className="titleTextWrap">
            <span className="logoText">{">"}wechicken</span>
            <span className="titleText">새로운 포스트를 추가해주세요</span>
          </div>
        </Title>
        <FontAwesomeIcon
          onClick={() => closeModal(false)}
          className="BtnClose"
          icon={faTimes}
        />
        <Contents>
          <Description>
            <h1>{name}님을 응원합니다</h1>
            <p>
              일부 사이트를 제외하고는 <br></br>
              직접 포스팅을 등록해 주셔야 합니다 <br></br>
            </p>

            <p>
              빠른 시일 안에 <br></br>
              모든 블로그 자동 업데이트 서비스를 <br></br>
              지원할 수 있도록 하겠습니다.
            </p>

            <p>
              매 주, 하나 둘씩 블로그를 작성하다보면<br></br>
              어느새 훌쩍 성장한 자신의 모습을<br></br>
              발견할 수 있을거예요.
            </p>

            <p>
              (•ө•)♡ 화이팅! <br></br>
            </p>
          </Description>
          <InputFormWrap>
            <InputTheme
              width={170}
              type={"포스팅 제목"}
              handleType={handleInputValues}
              placeholder="예시)2차 프로젝트 회고록"
              size={14}
              name={"title"}
            />
            <InputTheme
              width={170}
              type={"포스팅 링크"}
              handleType={handleInputValues}
              placeholder={"링크를 복사, 붙여넣어주세요"}
              size={14}
              name={"link"}
            />
            <InputTheme
              width={170}
              type={"작성날짜"}
              handleType={handleInputValues}
              placeholder={"예시)2020.09.20"}
              size={14}
              name={"date"}
              validationCheck={isDateFormatCorrect}
            />
          </InputFormWrap>
        </Contents>
        <BtnSubmit
          btnText="추가"
          executeFunction={fetchNewPost}
          submitActivate={submitActivate}
        ></BtnSubmit>
      </Container>
    </>
  );
};

export default AddPostModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 675px;
  height: 470px;
  background-color: ${theme.white};
  transform: translate(-50%, -50%);
  box-shadow: -14px -14px 20px rgba(0, 0, 0, 0.02),
    14px 14px 20px rgba(0, 0, 0, 0.05);
  z-index: 11;

  .BtnClose {
    position: absolute;
    right: 0;
    width: 21px;
    height: 21px;
    margin: 15px;
    color: #828282;
    cursor: pointer;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  .logoImage {
    width: 60px;
    height: 60px;
    margin: 30px;
  }

  .titleTextWrap {
    display: flex;
    flex-direction: column;

    .logoText {
      font-size: 16px;
      font-family: ${theme.fontTitle};
    }

    .titleText {
      margin-top: 7px;
      font-size: 16px;
      font-weight: 600;
      font-family: ${theme.fontContent};
      color: ${theme.orange};
    }
  }
`;

const Description = styled.div`
  width: 230px;
  font-family: ${theme.fontContent};
  color: ${theme.deepGrey};

  h1 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 15px;
    color: ${theme.fontColor};
  }

  p {
    margin-bottom: 15px;
    line-height: 18px;
    font-size: 12px;
  }
`;

const Contents = styled.div`
  margin: 10px 95px;
  display: flex;
  justify-content: space-between;
`;

const InputFormWrap = styled.form`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span {
    margin-left: 12px;
    color: ${theme.fontColor};
  }
`;
