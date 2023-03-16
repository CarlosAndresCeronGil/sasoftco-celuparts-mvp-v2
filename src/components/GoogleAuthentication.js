import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import styled from "styled-components";
import axios from "axios";

/* eslint-disable react/prop-types */
const StyledGoogleButton = styled(GoogleButton)`
  & > div {
    display: flex !important;
    align-items: center !important;
    margin-top: 0 !important;
    height: 80% !important;
  }
`;

const GoogleAuthentication = ({ onAuthenticated, widthButton }) => {
  const [user, setUser] = useState();

  const login = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse),
    onError: error => console.log("Login Failed:", error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json"
            }
          }
        )
        .then(res => {
          onAuthenticated({ data: res.data });
        })
        .catch(err => console.log(err));
    }
  }, [user]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledGoogleButton
        onClick={() => login()}
        label="Continuar con Google"
        type="light" // puede ser "light" o "dark"
        disabled={false}
        style={{
          border: "1px solid black",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          fontSize: "0.9rem",
          height: 40,
          width: widthButton || "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontWeight: "bold"
        }}
        onAuthenticated={onAuthenticated} // cambiar a `true` para deshabilitar el botón
      />
    </div>

    // <GoogleLogin
    //   theme="filled_black"
    //   shape="pill"
    //   onSuccess={responseMessage}
    //   onError={errorMessage}
    //   buttonText="Continuar con Google"
    //   prompt="select_account"
    //   cookiePolicy="single_host_origin"
    // />
  );
};

export default GoogleAuthentication;
