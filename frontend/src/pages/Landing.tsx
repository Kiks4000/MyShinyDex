import React from "react";
import Header from "../component/Header";
import { Props } from "../App";

function Landing({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>Landing</h1>
    </>
  );
}
export default Landing;
