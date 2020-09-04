import React from "react";
import Dimmer from "../../../Components/Dimmer";
import CreateMyGroupModal from "./CreateMyGroupModal";

const CreateMyGroup = ({ setCreateMyGroupModalOn }) => {
  return (
    <>
      <Dimmer />
      <CreateMyGroupModal setCreateMyGroupModalOn={setCreateMyGroupModalOn} />
    </>
  );
};

export default CreateMyGroup;
