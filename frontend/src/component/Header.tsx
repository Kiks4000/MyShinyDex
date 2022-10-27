import React from "react";
import "../styles/_header.scss";
import Logo from "../img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

type Props = {
  checkLogin: () => boolean;
};

function Header({ checkLogin }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("MyShinyToken");
    cookies.remove("MyShinyUser");
    cookies.remove("MyShinyUser_username");
    cookies.remove("MyShinyUser_isVerified");
    cookies.remove("MyShinyUser_isAdmin");
    cookies.remove("MyShinyUser_id");
    navigate("/");
  };

  const cookies = new Cookies();
  const isVerified = cookies.get("MyShinyUser_isVerified");
  const isAdmin = cookies.get("MyShinyUser_isAdmin");
  return (
    <header className="header">
      <div className="header__left">
        <div className="header__left--logoContainer">
          {checkLogin() && isVerified === "true" ? (
            <NavLink to="/Home">
              <img src={Logo} alt="logo" className="header__left--logo" />
            </NavLink>
          ) : checkLogin() && isVerified === "false" ? (
            <NavLink to="/NotValidated">
              <img src={Logo} alt="logo" className="header__left--logo" />
            </NavLink>
          ) : (
            <NavLink to="/">
              <img src={Logo} alt="logo" className="header__left--logo" />
            </NavLink>
          )}
        </div>
        <div className="header_left--links">
          {checkLogin() && isVerified === "true" ? (
            <>
              <NavLink className="left-link" to="/MyProfile">
                My Profile
              </NavLink>
              <NavLink className="left-link" to="/MyAccount">
                My Account
              </NavLink>
              <NavLink className="left-link" to="/Mail">
                Mail
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="header__right">
        {checkLogin() && isAdmin === "true" && isVerified === "true" ? (
          <NavLink className="right-link" to="/Admin">
            Admin
          </NavLink>
        ) : null}
        {checkLogin() ? null : (
          <NavLink className="right-link" to="/Login">
            Login
          </NavLink>
        )}
        {checkLogin() ? (
          <a className="right-link" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <NavLink className="right-link-register" to="/Register">
            Register
          </NavLink>
        )}
      </div>
    </header>
  );
}
export default Header;
