import React from "react";
import Header from "../component/Header";
import { Props } from "../App";

function NoValidate({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>Your are not Validate mon bruuudha</h1>
    </>
  );
}

export default NoValidate;
