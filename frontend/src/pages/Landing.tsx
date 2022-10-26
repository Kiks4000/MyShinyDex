import React from "react";
import Header from "../component/Header";
import { Props } from "../App";
import Footer from "../component/Footer";

function Landing({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main>
        <h1>Landing</h1>
      </main>
      <Footer />
    </>
  );
}
export default Landing;
