import { useState } from "react";
import ProfileIcon from "../Components/ProfileIcon";

const useUpload = (input) => {
  const [convertedImage, setconvertedImage] = useState(input);
  const [inputImage, setInputImage] = useState(input);

  const handleImage = (e) => {
    setconvertedImage(window.URL.createObjectURL(e.target.files[0]));
    setInputImage(e.target.files[0]);
  };

  return [handleImage, convertedImage, ProfileIcon, inputImage];
};

export default useUpload;
