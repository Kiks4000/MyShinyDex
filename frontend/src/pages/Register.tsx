import React from "react";
import Header from "../component/Header";
import { Props } from "../App";

function Register({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>Register</h1>
    </>
  );
}

export default Register;
