import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Props } from "../App";

function LoginForm({ checkLogin }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setError(res.data.message);
      })
      .catch((err) => {
        console.log(err);
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
