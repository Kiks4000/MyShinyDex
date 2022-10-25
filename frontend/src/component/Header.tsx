import React from "react";
import "../styles/_header.scss";
import Logo from "../img/logo.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__left--logoContainer">
          <NavLink to="/Home">
            <img src={Logo} alt="logo" className="header-logo" />
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
        <NavLink className="right-link" to="/Login">
          Login
        </NavLink>
        <NavLink className="right-link-register" to="#">
          Register
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
