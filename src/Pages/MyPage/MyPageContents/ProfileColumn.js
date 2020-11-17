import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { API_URL } from "../../../config";
import theme, { flexCenter } from "../../../Styles/Theme";
import useUpload from "../../../hooks/useUpload";
import Alert from "../../../Components/Alert";
import EditForm from "./Components/EditForm";
import { userProfileImg } from "../../../store/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";

function ProfileColumn({ myProfile, deleteProfileImg }) {
  const [
    handleEditProfileImg,
    editedProfileImg,
    ProfileIcon,
    defaultImg,
  ] = useUpload();
  const { wecode_nth, user_name, gmail } = myProfile;
  const [isActiveAlert, setActiveAlert] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState("");
  const [contentValue, setContentValue] = useState("");
  const dispatch = useDispatch();
  const userProfileImgVariable = useSelector(
    (state) => state.userProfileReducer
  );

  useEffect(() => {
    if (editedProfileImg) {
      modifyProfileImg();
    }
    // eslint-disable-next-line
  }, [editedProfileImg]);

  useEffect(() => {
    setContentValue(myProfile.blog_address);
  }, [myProfile.blog_address]);

  const activeEditForm = () => {
    setisEdit(!isEdit);
  };

  const handleSubmit = (e) => {
    setisEdit(!isEdit);
    myProfile.blog_address !== contentValue && modifyBlogUrl();
    e.preventDefault();
  };

  const handleContentValue = (e) => {
    setContentValue(e.target.value);
  };

  const modifyBlogUrl = () => {
    myProfile.blog_address = contentValue
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

  const modifyProfileImg = () => {
    const formData = new FormData();
    formData.append("user_thumbnail", defaultImg);
    axios
      .post(`${API_URL}/mypage`, formData, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("USER"))?.token,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          dispatch(userProfileImg(res.data.profile));
          sessionStorage.setItem(
            "USER",
            JSON.stringify({
              ...JSON.parse(sessionStorage.getItem("USER")),
              profile: res.data.profile,
            })
          );
        }
      });
  };

  return (
    <ProfileContainer>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          alertMessage={"프로필 이미지를 삭제하시겠습니까?"}
          excuteFunction={() => {
            deleteProfileImg(deleteEvent);
          }}
          submitBtn={"확인"}
          closeBtn={"취소"}
        />
      )}
      <ProfilePhoto>
        <ProfileIcon size={131} img={userProfileImgVariable} />
        <label>
          <input
            type="file"
            onChange={handleEditProfileImg}
            onSubmit={modifyProfileImg}
          />
          <UploadPhotoBtn>이미지 업로드</UploadPhotoBtn>
        </label>
        <DeletePhotoBtn
          data-name="user_thumbnail"
          onClick={(e) => {
            setDeleteEvent(e.target.dataset.name);
            setActiveAlert(true);
          }}
        >
          이미지 제거
        </DeletePhotoBtn>
      </ProfilePhoto>
      <ProfileContents>
        <span className="userNth">{wecode_nth}기</span>
        <h1 className="userName">{user_name}</h1>
        <div className="userInfo">
          <span className="email">{gmail}</span>
          {isEdit ? (
            <EditForm
              contentValue={contentValue}
              handleContentValue={handleContentValue}
              handleSubmit={handleSubmit}
            />
          ) : (
            <div className="userBlogAddress">
              <span>
                {contentValue}
                <FontAwesomeIcon
                  onClick={activeEditForm}
                  className="editBtn"
                  icon={faEdit}
                />
              </span>
            </div>
          )}
        </div>
      </ProfileContents>
    </ProfileContainer>
  );
}

export default ProfileColumn;

const ProfileContainer = styled.section`
  width: 1020px;
  height: 356px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.04);
  border-radius: 47px;
  background: #ffffff;
`;

const ProfilePhoto = styled.div`
  width: 320px;
  ${flexCenter};
  flex-direction: column;
  font-family: ${theme.fontContent};
  font-weight: 500;
  border-right: 3px solid rgba(255, 214, 108, 0.8);

  img {
    margin: 10px 0;
    border-radius: 100%;
  }

  input {
    display: none;
  }
`;

const UploadPhotoBtn = styled.div`
  width: 164px;
  height: 36px;
  margin: 10px 0;
  ${flexCenter};
  border-radius: 4px;
  color: ${theme.white};
  background: ${theme.opacityOrange};
  cursor: pointer;

  &:hover {
    transition: 0.3s ease-in-out;
    background: rgb(255, 153, 0);
  }
`;

const DeletePhotoBtn = styled(UploadPhotoBtn)`
  background-color: transparent;
  color: ${theme.orange};

  &:hover {
    transition: 0.3s ease-in-out;
    background: rgba(255, 153, 0, 0.2);
  }
`;

const ProfileContents = styled.div`
  width: 60%;
  height: 200px;
  margin-left: 40px;
  font-weight: 600;
  font-size: 28px;
  color: ${theme.fontColor};
  position: relative;

  h1 {
    margin: 10px 0;
  }
  .userInfo {
    margin-top: 75px;
  }

  .userBlogAddress {
    display: flex;
    align-items: center;
  }

  span {
    display: block;
    margin: 10px 0;
    width: 300px;
    font-size: 18px;
    font-weight: 400;
    color: ${theme.deepGrey};
  }

  .editBtn {
    margin-left: 10px;
    font-size: 18px;
    color: ${theme.orange};
    background-color: transparent;
    cursor: pointer;
  }

  .saveBtn {
    width: 80px;
    height: 10px;
    font-size: 15px;
    font-weight: 600;
    background-color: ${theme.orange};
    color: ${theme.white};
  }
`;
