import React from "react";
import Header from "../component/Header";
import { Props } from "../App";
import Footer from "../component/Footer";
import ForgotForm from "../component/ForgotForm";

function ForgotPass({ checkLogin }: Props) {
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
