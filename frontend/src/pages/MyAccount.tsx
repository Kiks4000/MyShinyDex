import React from "react";
import Header from "../component/Header";
import { User, Props } from "../App";

function MyAccount({ checkLogin, user }: Props & { user: User | null }) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>My Account</h1>
    </>
  );
}

export default MyAccount;
