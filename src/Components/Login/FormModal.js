import React, { useState } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../../src/Styles/Theme";
import axios from "axios";
import { loginToken } from "../../store/actions/loginAction";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCamera } from "@fortawesome/free-solid-svg-icons";
import InputTheme from "../Buttons/InputTheme";
import BtnTheme from "../Buttons/BtnTheme";
import useUpload from "../hooks/useUpload";
import { API_URL } from "../../config";

const LoginModal = ({ setModalOn, googleInput }) => {
  // eslint-disable-next-line
  const [inputImage, setInputImage] = useState(googleInput.jK);
  const [inputName, setInputName] = useState(googleInput.Ad);
  const [nth, setNth] = useState("");
  const [blogAddress, setBlogAddress] = useState("");
  const dispatch = useDispatch();

  const [
    handleInputImage,
    convertedImg,
    ProfileIcon,
    uploadedImage,
  ] = useUpload(inputImage);

  const handleUploadForm = () => {
    const formData = new FormData();
    formData.append(
      "user_thumbnail",
      uploadedImage ? uploadedImage : inputImage
    );
    formData.append("user_name", inputName);
    formData.append("wecode_nth", nth);
    formData.append("blog_address", blogAddress);
    formData.append("gmail_id", googleInput.aU);
    formData.append("gmail", googleInput.bu);

    axios
      .post(`${API_URL}/auth/additional`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          sessionStorage.setItem("token", res.data.token);
          dispatch(loginToken(res.data.token));
          setModalOn(false);
          alert("로그인 되었습니다");
        }
      });
  };

  return (
    <Container>
      <FontAwesomeIcon
        onClick={() => setModalOn(false)}
        className="BtnClose"
        icon={faTimes}
      />
      <LogoBox>
        <img className="logoImage" alt="logo" src="/Images/logo.png"></img>
        <span>>wechicken</span>
      </LogoBox>
      <ContentsBox>
        <Greeting>
          <div className="greeting">{inputName}님 환영합니다!</div>
          <div className="type">추가 정보를 입력해주세요</div>
        </Greeting>
        <form method="post" enctype="multipart/form-data">
          <ImageBox>
            <label>
              <ProfileIcon
                size={80}
                img={convertedImg ? convertedImg : inputImage}
              />
              <div className="cameraIcon">
                <FontAwesomeIcon icon={faCamera} />
                <input type="file" onChange={handleInputImage}></input>
              </div>
            </label>
          </ImageBox>
          <FormWrap>
            <div className="nameAndnth">
              <InputTheme width={100} type={"이름"} handleType={setInputName} />
              <InputTheme width={60} type={"기수"} handleType={setNth} />
            </div>
            <InputTheme
              width={340}
              type={"블로그 주소"}
              handleType={setBlogAddress}
            />
          </FormWrap>
        </form>
        <div className="submit" onClick={handleUploadForm}>
          <BtnTheme value={"제출"} />
        </div>
      </ContentsBox>
    </Container>
  );
};

export default LoginModal;

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
  z-index: 2;

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

const LogoBox = styled.div`
  width: 40%;
  ${flexCenter}
  flex-direction: column;
  background-color: #ffeaa0;

  .logoImage {
    width: 120px;
    height: 120px;
  }

  span {
    margin-top: 10px;
    font-family: ${theme.fontTitle};
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: #1a202c;
  }
`;

const ContentsBox = styled.div`
  width: 60%;
  padding: 20px;

  .submit {
    width: 100px;
    margin-left: auto;
    margin-right: 14px;
  }
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;

  .greeting {
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    color: #ff7425;
  }

  .type {
    margin-top: 5px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    color: #828282;
  }
`;

// const Form = styled.form``;

const ImageBox = styled.div`
  height: 120px;
  margin-top: 18px;
  ${flexCenter}

  label {
    position: relative;
    width: 80px;
    height: 80px;

    .cameraIcon {
      position: absolute;
      bottom: -10px;
      left: 27px;
      width: 28px;
      height: 28px;
      ${flexCenter}
      border-radius: 50%;
      background-color: ${theme.white};

      input {
        display: none;
      }
    }
  }
`;

const FormWrap = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .nameAndnth {
    display: flex;
  }
`;
