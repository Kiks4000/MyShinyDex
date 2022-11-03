import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Props } from "../App";

function MyAccount({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main>
        <h1>My Account</h1>
      </main>
      <Footer />
    </>
  );
}

export default MyAccount;
