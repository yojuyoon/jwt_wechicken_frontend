import React, { useState } from "react";
import Dimmer from "../Dimmer";
import LoginModal from "./LoginModal";
import FormModal from "./FormModal";
import CelebratingModal from "../Common/CelebratingModal";

const Login = ({ setModalOn }) => {
  const [isExistingUser, setExistingUser] = useState(true);
  const [googleInput, setGoogleInput] = useState("");
  const [isLoginSuccess, setLoginSuccess] = useState(false);

  const handleGoogleInput = (input) => {
    setGoogleInput(input);
  };

  return (
    <>
      <Dimmer />
      {isLoginSuccess && (
        <CelebratingModal
          celebratingMessage={"잠시만 기다려주세요!"}
        />
      )}
      {isExistingUser ? (
        <LoginModal
          setLoginSuccess={setLoginSuccess}
          setModalOn={setModalOn}
          setExistingUser={setExistingUser}
          handleGoogleInput={handleGoogleInput}
        />
      ) : (
        <FormModal setModalOn={setModalOn} googleInput={googleInput} setLoginSuccess={setLoginSuccess} setExistingUser={setExistingUser}/>
      )}
    </>
  );
};

export default Login;
