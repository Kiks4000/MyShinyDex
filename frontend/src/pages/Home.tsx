import React from "react";
import Header from "../component/Header";
import { User, Props } from "../App";
import Footer from "../component/Footer";

function Home({
  checkLogin,
  user,
  checkUser,
  checkUserAdmin,
  checkUserValidate,
  checkUserVerified,
}: Props & { user: User | null }) {
  React.useEffect(() => {
    checkLogin();
    checkUser();
    checkUserAdmin();
    checkUserValidate();
    checkUserVerified();
  }, []);
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
