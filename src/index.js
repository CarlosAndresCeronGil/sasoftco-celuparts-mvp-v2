/* eslint-disable */
/* eslint-disable import/no-named-as-default-member */
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// eslint-disable-next-line import/no-named-as-default
import reportWebVitals from "./reportWebVitals";
import moment from "moment-timezone";
import { store } from "./store/Store";
import App from "./App";
import "./data";
import { AuthProvider } from "./context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);
moment.tz.setDefault("America/Bogota");
// moment.tz.guess();

root.render(
  <GoogleOAuthProvider clientId="340147154425-d3l3fvehb674rt0dp03r0rrqr6es7kia.apps.googleusercontent.com">
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
    ,
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
