import React from "react";
import Header from "../component/Header";
import LoginForm from "../component/LoginForm";
import { Props } from "../App";
import Footer from "../component/Footer";

function Login({
  checkLogin,
  checkUser,
  checkUserAdmin,
  checkUserValidate,
  checkUserVerified,
}: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main className="login-mainContainer">
        <LoginForm
          checkLogin={checkLogin}
          checkUser={checkUser}
          checkUserAdmin={checkUserAdmin}
          checkUserValidate={checkUserValidate}
          checkUserVerified={checkUserVerified}
        />
      </main>
      <Footer />
    </>
  );
}
export default Login;
