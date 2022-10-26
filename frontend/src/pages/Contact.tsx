import React from "react";
import Header from "../component/Header";
import WIP from "../img/WIP.png";
import { Props } from "../App";
import Footer from "../component/Footer";

function Contact({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main className="mail-mainContainer">
        <h1>This section is under development</h1>
        <img src={WIP} alt="WIP" className="mail-WIP" />
      </main>
      <Footer />
    </>
  );
}

export default Contact;
