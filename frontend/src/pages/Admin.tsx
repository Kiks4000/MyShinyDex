import React from "react";
import Header from "../component/Header";
import { Props } from "../App";

function Admin({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>Admin</h1>
    </>
  );
}

export default Admin;
