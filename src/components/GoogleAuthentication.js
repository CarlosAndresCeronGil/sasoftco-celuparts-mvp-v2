import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const GoogleAuthentication = () => {
  const responseMessage = response => {
    console.log(response);
    console.log(jwtDecode(response.credential));
  };
  const errorMessage = error => {
    console.log(error);
  };

  googleLogout();

  return (
    <GoogleLogin
      type="icon"
      onSuccess={responseMessage}
      onError={errorMessage}
    />
  );
};

export default GoogleAuthentication;
