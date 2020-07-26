import React from "react";
import LogInForm from "./components/LogInForm";
import logo from "../../../assets/logo.png";

const LogIn = () => (
  <div className="account">
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">
            Forget Password
            <span className="account__logo">
              {/* <img src={logo} alt="logo" /> */}
              {/* <span className="account__logo-accent">DEV</span> */}
            </span>
          </h3>
          {/* <h4 className="account__subhead subhead">Start your business easily</h4> */}
        </div>
        <LogInForm onSubmit />
      </div>
    </div>
  </div>
);

export default LogIn;
