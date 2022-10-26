import React from "react";
import Header from "../component/Header";
import { Props } from "../App";
import Footer from "../component/Footer";

function Verify({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main>
        <h1>Verify</h1>
      </main>
      <Footer />
    </>
  );
}

export default Verify;
