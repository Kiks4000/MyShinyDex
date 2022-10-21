import React from "react";
import Header from "../component/Header";
import WIP from "../img/WIP.png";

function Mail() {
  return (
    <>
      <Header />
      <main className="mail-mainContainer">
        <h1>This section is under development</h1>
        <img src={WIP} alt="WIP" className="mail-WIP" />
      </main>
    </>
  );
}

export default Mail;
