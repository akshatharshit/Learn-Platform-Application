// src/components/LottiePlayer.jsx
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Animation - 1751141238746.json"; // update path if needed


const LottiePlayer = () => {
  return (
    <div className="w-40 h-40 mx-auto">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default LottiePlayer;
