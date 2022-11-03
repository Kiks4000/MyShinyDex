import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Props } from "../App";

function Register({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main>
        <h1>Register</h1>
      </main>
      <Footer />
    </>
  );
}

export default Register;
