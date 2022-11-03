import React from "react";
import Cookies from "universal-cookie";
import "./main.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Mail from "./pages/Mail";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import ForgotPass from "./pages/ForgotPass";
import NoValidate from "./pages/NoValidate";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Verify from "./pages/Verify";

export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: string;
  quote: string;
  platforms: string[];
  versions: string[];
  shinyList: string[];
  shinyWishlist: string[];
  shinyTradeList: string[];
  isVerified: boolean;
  isAdmin: boolean;
}

export type Props = {
  checkLogin: () => boolean;
};

function App() {
  axios.defaults.withCredentials = true;

  const maxAge = 7 * 24 * 60 * 60 * 1000;

  const cookies = new Cookies();
  const token = cookies.get("MyShinyToken");

  const [isLogged, setIsLogged] = React.useState(false);

  const checkLogin = () => {
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    return isLogged;
  };

  React.useEffect(() => {
    checkLogin();
    console.log("isLogged: " + isLogged);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Landing checkLogin={checkLogin} />} />
        <Route path="/Login" element={<Login checkLogin={checkLogin} />} />
        <Route
          path="/Register"
          element={<Register checkLogin={checkLogin} />}
        />
        <Route
          path="/ForgotPass"
          element={<ForgotPass checkLogin={checkLogin} />}
        />
        <Route path="/About" element={<About checkLogin={checkLogin} />} />
        <Route path="/Contact" element={<Contact checkLogin={checkLogin} />} />
        <Route
          path="/Verify/:token"
          element={<Verify checkLogin={checkLogin} />}
        />
        <Route
          path="/NotValidated"
          element={<NoValidate checkLogin={checkLogin} />}
        />
        <Route path="/Home" element={<Home checkLogin={checkLogin} />} />
        <Route
          path="/MyProfile"
          element={<MyProfile checkLogin={checkLogin} />}
        />
        <Route
          path="/MyAccount"
          element={<MyAccount checkLogin={checkLogin} />}
        />
        <Route path="/Mail" element={<Mail checkLogin={checkLogin} />} />
        <Route path="/Admin" element={<Admin checkLogin={checkLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
