import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Props } from "../App";

function Home({ checkLogin }: Props) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main>
        <h1>Home</h1>
      </main>
      <Footer />
    </>
  );
}

export default Home;
