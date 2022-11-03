import React from "react";
import "../styles/_header.scss";
import Logo from "../img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { Props } from "../App";

function Header({ checkLogin }: Props) {
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__left--logoContainer">
          <NavLink to="/">
            <img src={Logo} alt="logo" className="header__left--logo" />
          </NavLink>
        </div>
        <div className="header_left--links">
          <NavLink className="left-link" to="/MyProfile">
            My Profile
          </NavLink>
          <NavLink className="left-link" to="/MyAccount">
            My Account
          </NavLink>
          <NavLink className="left-link" to="/Mail">
            Mail
          </NavLink>
        </div>
      </div>
      <div className="header__right">
        <NavLink className="right-link" to="/Admin">
          Admin
        </NavLink>
        <NavLink className="right-link" to="/Login">
          Login
        </NavLink>
        <a className="right-link">Logout</a>
        <NavLink className="right-link-register" to="/Register">
          Register
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
