import React from "react";
import Header from "../component/Header";
import LoginForm from "../component/LoginForm";
import { Props } from "../App";
import Footer from "../component/Footer";

function Login({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main className="login-mainContainer">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
export default Login;
