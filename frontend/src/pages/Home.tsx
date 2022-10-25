import React from "react";
import Header from "../component/Header";
import { User, Props } from "../App";

function Home({ checkLogin, user }: Props & { user: User | null }) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>Home</h1>
    </>
  );
}

export default Home;
