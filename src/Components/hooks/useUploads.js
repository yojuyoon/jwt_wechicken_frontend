import React, { useState } from "react";
import ProfileIcon from "../ProfileIcon";

const useUploads = (input) => {
  const [inputImage, setInputImage] = useState(input);

  const handleImage = (e) => {
    setInputImage(window.URL.createObjectURL(e.target.files[0]));
  };

  return [handleImage, inputImage, ProfileIcon];
};

export default useUploads;
