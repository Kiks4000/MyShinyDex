import React from "react";
import Logo from "../img/logo.png";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <div className="footer__left--links">
          <NavLink className="left-link" to="/About">
            About
          </NavLink>
          <NavLink className="left-link" to="/Contact">
            Contact
          </NavLink>
        </div>
        <div className="left-icon"></div>
      </div>
      <div className="footer__mid">
        <a className="mid-link" href="#">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a className="mid-link" href="#">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a className="mid-link" href="#">
          <i className="fa-brands fa-pinterest-p"></i>
        </a>
        <a className="mid-link" href="#">
          <i className="fa-brands fa-discord"></i>
        </a>
      </div>
      <div className="footer__right">
        <img src={Logo} alt="logo" className="footer__left--logo" />
      </div>
    </footer>
  );
}

export default Footer;
