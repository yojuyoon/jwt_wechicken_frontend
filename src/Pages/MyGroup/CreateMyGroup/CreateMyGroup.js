import React from "react";
import Dimmer from "../../../Components/Dimmer";
import CreateOrModifyMyGroupModal from "./CreateOrModifyMyGroupModal";

const CreateMyGroup = ({ setCreateMyGroupModalOn }) => {
  return (
    <>
      <Dimmer />
      <CreateOrModifyMyGroupModal
        title={"내 기수 페이지 생성"}
        informationText={"치킨계 기수 가입 안내"}
        myGroupTitleText={"예시)10고 뜯고 10기 치킨계"}
        btnText={"생성"}
        closeModal={setCreateMyGroupModalOn}
        celebratingMessage={"치킨계 기수 가입을 축하합니다!"}
        setCreateMyGroupModalOn={setCreateMyGroupModalOn}
      />
    </>
  );
};

export default CreateMyGroup;
