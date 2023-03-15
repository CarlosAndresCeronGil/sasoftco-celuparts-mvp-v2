import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

/* eslint-disable react/prop-types */

const GoogleAuthentication = ({ onAuthenticated }) => {
  const responseMessage = response => {
    const userInfo = jwtDecode(response.credential);
    onAuthenticated({ data: userInfo });
  };
  const errorMessage = error => {
    console.log(error);
  };

  return (
    <GoogleLogin
      type="icon"
      onSuccess={responseMessage}
      onError={errorMessage}
    />
  );
};

export default GoogleAuthentication;
