import React from "react";
import Header from "../component/Header";
import WIP from "../img/WIP.png";
import { User, Props } from "../App";

function Mail({ checkLogin, user }: Props & { user: User | null }) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <main className="mail-mainContainer">
        <h1>This section is under development</h1>
        <img src={WIP} alt="WIP" className="mail-WIP" />
      </main>
    </>
  );
}

export default Mail;
