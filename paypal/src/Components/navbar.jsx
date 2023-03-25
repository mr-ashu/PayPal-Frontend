import React from "react";
import "./dashboard.css";
import { Login } from "./login";
import { Signup } from "./signup";
import { Sprint } from "./sprint";
export const Navbar = () => {
  return (
    <div className="navbar">
      <img
        src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
        alt="logo"
      />
      <div>
        <Login />
        <Signup />
      </div>
    </div>
  );
};
