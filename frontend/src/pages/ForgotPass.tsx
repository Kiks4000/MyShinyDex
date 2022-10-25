import React from "react";
import Header from "../component/Header";
import { Props } from "../App";
import { useNavigate } from "react-router-dom";

function ForgotPass({ checkLogin }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>Forgot Password</h1>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}

export default ForgotPass;
