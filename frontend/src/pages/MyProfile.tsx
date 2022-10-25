import React from "react";
import Header from "../component/Header";
import { User, Props } from "../App";

function MyProfile({ checkLogin, user }: Props & { user: User | null }) {
  return (
    <>
      <Header checkLogin={checkLogin} />
      <h1>My Profile</h1>
    </>
  );
}

export default MyProfile;
