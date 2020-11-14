import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../src/Styles/Theme";
import axios from "axios";
import { loginToken, userProfileImg } from "../../store/actions/loginAction";
import { myGroupStatus } from "../../store/actions/myGroupStatusAction";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCamera } from "@fortawesome/free-solid-svg-icons";
import InputTheme from "../Buttons/InputTheme";
import BtnCheck from "../Buttons/BtnCheck";
import useUpload from "../../hooks/useUpload";
import LogoBox from "./LogoBox";
import BtnSubmit from "../Buttons/BtnSubmit";
import { API_URL } from "../../config";

const FormModal = ({
  setModalOn,
  googleInput,
  setLoginSuccess,
  setExistingUser,
}) => {
  // eslint-disable-next-line
  const [inputImage, setInputImage] = useState(googleInput.getImageUrl());
  const [inputName, setInputName] = useState("");
  const [nth, setNth] = useState("");
  const [blogAddress, setBlogAddress] = useState("");
  const [isJoinGroup, setJoinGroup] = useState(true);
  const [agreementStatus, setAgreementStatus] = useState(true);
  const [submitActivate, setSubmitActivate] = useState(false);
  const dispatch = useDispatch();

  const [
    handleInputImage,
    convertedImg,
    ProfileIcon,
    uploadedImage,
  ] = useUpload(inputImage);

  const handleCheckBox = (type) => {
    type === "치킨계 가입(선택)"
      ? setJoinGroup(!isJoinGroup)
      : setAgreementStatus(!agreementStatus);
  };

  useEffect(() => {
    inputName && nth && blogAddress && agreementStatus
      ? setSubmitActivate(true)
      : setSubmitActivate(false);
  }, [inputName, nth, blogAddress, agreementStatus]);

  const fetchUserData = async (formData) => {
    try {
      setLoginSuccess(true);
      const res = await axios.post(`${API_URL}/auth/additional`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.token) {
        setExistingUser(true);
        sessionStorage.setItem(
          "USER",
          JSON.stringify({
            token: res.data.token,
            profile: res.data.profile,
            myGroupStatus: res.data.myGroupStatus,
            myNth: res.data.nth,
          })
        );
        setTimeout(() => {
          setLoginSuccess(false);
          setModalOn(false);
        }, 1000);
        dispatch(loginToken(res.data.token));
        dispatch(userProfileImg(res.data.profile));
        dispatch(myGroupStatus(res.data.myGroupStatus));
      }
    } catch (error) {
      alert("에러가 발생했습니다");
    }
  };

  const handleUploadForm = async () => {
    const formData = new FormData();
    formData.append(
      "user_thumbnail",
      uploadedImage ? uploadedImage : inputImage
    );
    formData.append("user_name", inputName);
    formData.append("wecode_nth", nth.replace(/[^0-9]/g, ""));
    formData.append("blog_address", blogAddress);
    formData.append("gmail_id", googleInput.getId());
    formData.append("gmail", googleInput.getEmail());
    formData.append("is_group_joined", isJoinGroup);

    fetchUserData(formData);
  };

  return (
    <Container>
      <FontAwesomeIcon
        onClick={() => setModalOn(false)}
        className="BtnClose"
        icon={faTimes}
      />
      <LogoBox />
      <ContentsBox>
        <Greeting>
          <div className="name">{googleInput.getName()}님</div>
          <div className="greeting">환영합니다!</div>
          <div className="type">추가 정보를 입력해주세요</div>
        </Greeting>
        <Form method="post" encType="multipart/form-data">
          <ImageBox>
            <label>
              <ProfileIcon
                size={64}
                img={convertedImg ? convertedImg : inputImage}
              />
              <div className="cameraIcon">
                <FontAwesomeIcon icon={faCamera} />
                <input type="file" onChange={handleInputImage}></input>
              </div>
            </label>
          </ImageBox>
          <FormWrap>
            <InputTheme
              width={156}
              type={"기수"}
              handleType={setNth}
              size={14}
            />
            <InputTheme
              width={156}
              type={"이름"}
              handleType={setInputName}
              size={14}
            />
            <InputTheme
              width={156}
              type={"블로그 주소"}
              handleType={setBlogAddress}
              size={14}
            />
            <BtnCheck
              text={"치킨계 가입(선택)"}
              handleCheckBox={handleCheckBox}
              isChecked={isJoinGroup}
            />
            <BtnCheck
              text={"블로그 정보 수집 동의(필수)"}
              handleCheckBox={handleCheckBox}
              isChecked={agreementStatus}
            />
          </FormWrap>
        </Form>
        <BtnSubmit
          btnText={"제출"}
          executeFunction={handleUploadForm}
          submitActivate={submitActivate}
        ></BtnSubmit>
      </ContentsBox>
    </Container>
  );
};

export default FormModal;

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 675px;
  height: 470px;
  transform: translate(-50%, -50%);
  background-color: ${theme.white};
  box-shadow: -14px -14px 20px rgba(0, 0, 0, 0.02),
    14px 14px 20px rgba(0, 0, 0, 0.05);
  z-index: 100;

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

const ContentsBox = styled.div`
  width: 50%;
  padding: 20px;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  .name {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: #ff7425;
  }

  .greeting {
    font-weight: bold;
    font-size: 20px;
    line-height: 29px;
    color: #525151;
  }

  .type {
    margin-top: 20px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: #8a8383;
  }
`;

const Form = styled.form`
  height: 230px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  margin: 15px 10px 0 10px;
  align-items: flex-start;
  display: flex;

  label {
    position: relative;

    .cameraIcon {
      position: absolute;
      right: -3px;
      bottom: -5px;
      width: 28px;
      height: 28px;
      ${flexCenter}
      border-radius: 50%;
      background-color: ${theme.white};

      svg {
        width: 16px;
        height: 16px;
      }

      input {
        display: none;
      }
    }
  }
`;

const FormWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
