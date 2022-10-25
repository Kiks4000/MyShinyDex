import React from "react";
import Header from "../component/Header";
import LoginForm from "../component/LoginForm";

function Login() {
  return (
    <>
      <Header />
      <main className="login-mainContainer">
        <LoginForm />
      </main>
    </>
  );
}
export default Login;
