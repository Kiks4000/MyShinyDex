import React from "react";
import Header from "../component/Header";
import { User, Props } from "../App";
import Footer from "../component/Footer";

function MyAccount({ checkLogin, user }: Props & { user: User | null }) {
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
