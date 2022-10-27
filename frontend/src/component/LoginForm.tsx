import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Props } from "../App";

function LoginForm({
  checkLogin,
  checkUser,
  checkUserAdmin,
  checkUserValidate,
  checkUserVerified,
}: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const cookies = new Cookies();
        const MyShinyToken = res.data.token;
        const MyShinyUser = res.data.user;
        const isVerif = res.data.validate;
        cookies.set("MyShinyToken", MyShinyToken, {
          httpOnly: false,
          path: "/",
          maxAge: maxAge,
        });
        cookies.set("MyShinyUser", MyShinyUser, {
          httpOnly: false,
          path: "/",
          maxAge: maxAge,
        });
        if (isVerif === true) {
          checkLogin();
          checkUser();
          checkUserAdmin();
          checkUserValidate();
          checkUserVerified();
          navigate("/Home");
        } else {
          navigate("/NotValidated");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <h1 className="login-title">Login to access your profile !</h1>
      <div className="login-formContainer">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChangeEmail}
              autoComplete="on"
            />
            {error === "Email does not exist" ? (
              <p className="error">{error}</p>
            ) : null}
          </div>

          <div className="login-formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChangePassword}
              autoComplete="on"
            />
            {error === "Password is incorrect" ? (
              <p className="error">{error}</p>
            ) : null}
          </div>
          <div className="login-formGroup">
            <button type="submit" className="login-btn">
              Login
            </button>
            <NavLink to="/ForgotPass" className="login-forgotpassword">
              Forgot password ?
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
