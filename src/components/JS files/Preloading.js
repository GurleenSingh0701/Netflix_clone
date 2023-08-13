import React from "react";
import "../Css files/Preloading.css";

import intro from "./netflix-opening-intro.mp3";

function Preloading() {
  return (
    <div className="preloader">
      <audio className="logo-audio" autoPlay>
        <source src={intro} type="audio/mp3" />
      </audio>
      <div className="logo">NETFLIX</div>

      <span className="circle-loading"></span>
    </div>
  );
}

export default Preloading;
