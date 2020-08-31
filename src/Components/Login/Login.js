import React, { useState } from "react";
// import styled from "styled-components";
// import theme, { flexCenter } from "../../../src/Styles/Theme";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Dimmer from "../Dimmer";
import LoginModal from "./LoginModal";
import FormModal from "./FormModal";

const Login = ({ setModalOn }) => {
  const [isExistingUser, setExistingUser] = useState(true);
  const [googleInput, setGoogleInput] = useState("");

  const handleGoogleInput = (input) => {
    setGoogleInput(input);
  };

  return (
    <>
      <Dimmer />
      {isExistingUser ? (
        <LoginModal
          setModalOn={setModalOn}
          setExistingUser={setExistingUser}
          handleGoogleInput={handleGoogleInput}
        />
      ) : (
        <FormModal setModalOn={setModalOn} googleInput={googleInput} />
      )}
      {/* <FormModal setModalOn={setModalOn} googleInput={googleInput} /> */}
    </>
  );
};

export default Login;
