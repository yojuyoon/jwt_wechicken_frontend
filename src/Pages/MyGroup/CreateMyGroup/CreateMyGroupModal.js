import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputTheme from "../../../Components/Buttons/InputTheme";
import theme, { flexCenter } from "../../../Styles/Theme";

const CreateMyGroupModal = () => {
  const [nth, setNth] = useState("");
  const [myGroupTitle, setMyGroupTitle] = useState("");

  return (
    <Container>
      <Title>
        <img className="logoImage" alt="logo" src="/Images/logo.png" />
        <div className="titleTextWrap">
          <span className="logoText">{'>'}wechicken</span>
          <span className="titleText">내 기수 페이지 생성</span>
        </div>
      </Title>
      <FontAwesomeIcon
        className="BtnClose"
        icon={faTimes}
      />
      <Contents>
        <Description>
          <h1>치킨계 기수 가입 안내</h1>
          <p>wecode 그리고<br></br>
             wechicken에 오신 것을 환영합니다!</p>

          <p>wechicken은 보다 성실한 여러분들로<br></br>
             거듭날 수 있도록 도와줄 것입니다.</p>

          <p>페이지 생성 후 계장 권한을 가진 분은<br></br>
				     블로그 업로드 횟수 및 기부금 수정이<br></br>
             가능합니다.</p>

          <p>수정시에는 동기들과 충분한 상의 후에<br></br>
             진행해주세요 (•ө•)♡ 화이팅!</p>
        </Description>
        <InputFormWrap>
          <InputTheme width={170} type={"기수"} handleType={setNth} placeholder={"예시)10기"} />
          <InputTheme width={170} type={"기수 페이지명"} handleType={setMyGroupTitle} placeholder={"예시)10고 뜯고 10기 치킨계"} />
          <InputTheme width={170} type={"주 블로그 업로드 횟수"} handleType={setMyGroupTitle} placeholder={"예시)3회"} />
          <InputTheme width={170} type={"회당 기부금"} handleType={setMyGroupTitle} placeholder={"예시)3000원"} />
        </InputFormWrap>
      </Contents>
      <Submit
        className="submit"
      >
        <div className="SubmitBtn">생성</div>
      </Submit>
    </Container>
  );
};

export default CreateMyGroupModal;

const Container = styled.div`
  display: flex;
  flex-direction:column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 675px;
  height: 470px;
  background-color:${theme.white};
  transform: translate(-50%, -50%);
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

const Title = styled.div`
  display:flex;
  align-items:center;

  .logoImage{
      width:60px;
      height:60px;
      margin: 30px;
  }

  .titleTextWrap{
      display:flex;
      flex-direction:column;

    .logoText{
        font-size:16px;
        font-family:${theme.fontTitle};
    }

    .titleText{
        margin-top:7px;
        font-size:16px;
        font-weight:600;
        font-family:${theme.fontContent};
        color:${theme.orange};
    }
  }
`

const Description = styled.div`
	width:230px;
	font-family:${theme.fontContent};
	color:${theme.deepGrey};

      h1{
					margin-bottom:20px;
					font-weight:500;
					font-size:15px;
					color:${theme.fontColor};
			}

			p{
				margin-bottom:15px;
				line-height:18px;
				font-size:12px;
			}
`

const Contents = styled.div`
  margin:10px 95px;
  display:flex;
  justify-content:space-between;
`

const InputFormWrap = styled.form`
  height:250px;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
`

const Submit = styled.div`
	width: 80px;
  position:absolute;
  bottom:35px;
  right:50px;

  .SubmitBtn {
    ${flexCenter}
    height: 32px;
    padding: 0 18px;
    border-radius: 1rem;
    cursor: pointer;
    color: ${theme.white};
    background-color: ${theme.orange};
    opacity:0.8;
  }

  .SubmitBtn:hover{
    opacity:1;
  }
`;
