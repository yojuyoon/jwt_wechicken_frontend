import React from "react";
import Dimmer from "../../../Components/Dimmer";
import CreateOrModifyMyGroupModal from "../CreateMyGroup/CreateOrModifyMyGroupModal";

const ModifyMyGroup = ({
  setCreateMyGroupModalOn,
  getMyGroupTitle,
  setModifyMyGroup,
}) => {
  return (
    <>
      <Dimmer />
      <CreateOrModifyMyGroupModal
        title={"내 기수 페이지 수정"}
        informationText={"기수 페이지 수정 안내"}
        btnText={"수정"}
        myGroupTitleText={getMyGroupTitle}
        closeModal={setModifyMyGroup}
        celebratingMessage={"수정이 완료되었습니다!"}
        setCreateMyGroupModalOn={setCreateMyGroupModalOn}
      />
    </>
  );
};

export default ModifyMyGroup;
