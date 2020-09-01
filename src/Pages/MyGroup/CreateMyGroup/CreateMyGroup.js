import React, { useState } from "react";
import Dimmer from "../../../Components/Dimmer";
import CreateMyGroupModal from "./CreateMyGroupModal";

const CreateMyGroup = () => {
    return (
        <>
            <Dimmer />
            <CreateMyGroupModal />
        </>
    );
};

export default CreateMyGroup;
