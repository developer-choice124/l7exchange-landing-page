import React from "react";

 import LogoUpload from "./logo.js";
 import Social from "./Social.js";
const Logo = () => {
  document.title = "Setting";
  
  return (
    <>
    <LogoUpload/>
      <Social/>      
    </>
  )
}

export default Logo;