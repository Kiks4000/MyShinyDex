import React from "react";
import Header from "../component/Header";
import { Props } from "../App";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import ForgotForm from "../component/ForgotForm";

function ForgotPass({ checkLogin }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main className="recover-mainContainer">
        <ForgotForm />
      </main>
      <Footer />
    </>
  );
}

export default ForgotPass;
