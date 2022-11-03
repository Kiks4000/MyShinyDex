import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Props } from "../App";

function NoValidate({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main>
        <h1>Your are not Validate mon bruuudha</h1>
      </main>
      <Footer />
    </>
  );
}

export default NoValidate;
