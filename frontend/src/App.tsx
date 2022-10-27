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
  checkUserAdmin: () => boolean;
  checkUserVerified: () => boolean;
  checkUserValidate: () => boolean;
  checkUser: () => void | null;
};

function App() {
  const maxAge = 7 * 24 * 60 * 60 * 1000;

  const checkLogin = () => {
    const cookies = new Cookies();
    const token = cookies.get("MyShinyToken");
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const [user, setUser] = React.useState<User | null>(null);

  const checkUser = () => {
    const cookies = new Cookies();
    const user = cookies.get("MyShinyUser");
    if (user) {
      axios
        .get("http://localhost:5000/api/user/" + user)
        .then((res) => {
          setUser(res.data);
          const cookies = new Cookies();
          const user_username = res.data.username;
          const user_isVerified = res.data.isVerified;
          const user_isAdmin = res.data.is_admin;
          const user_id = res.data._id;
          cookies.set("MyShinyUser_username", user_username, {
            httpOnly: false,
            path: "/",
            maxAge: maxAge,
          });
          cookies.set("MyShinyUser_isVerified", user_isVerified, {
            httpOnly: false,
            path: "/",
            maxAge: maxAge,
          });
          cookies.set("MyShinyUser_isAdmin", user_isAdmin, {
            httpOnly: false,
            path: "/",
            maxAge: maxAge,
          });
          cookies.set("MyShinyUser_id", user_id, {
            httpOnly: false,
            path: "/",
            maxAge: maxAge,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const cookies = new Cookies();
  const user_isVerified = cookies.get("MyShinyUser_isVerified");
  const user_isAdmin = cookies.get("MyShinyUser_isAdmin");
  const user_id = cookies.get("MyShinyUser_id");
  const userValidate = cookies.get("MyShinyUser");

  const checkUserValidate = () => {
    if (userValidate === user_id) {
      return true;
    } else {
      return false;
    }
  };

  const checkUserVerified = () => {
    if (user_isVerified === "true") {
      return true;
    } else {
      return false;
    }
  };

  const checkUserAdmin = () => {
    if (user_isAdmin === "true") {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    checkLogin();
    checkUser();
    checkUserAdmin();
    checkUserValidate();
    checkUserVerified();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <Landing
              checkLogin={checkLogin}
              checkUserAdmin={checkUserAdmin}
              checkUserValidate={checkUserValidate}
              checkUserVerified={checkUserVerified}
              checkUser={checkUser}
            />
          }
        />
        <Route
          path="/Login"
          element={
            <Login
              checkLogin={checkLogin}
              checkUserAdmin={checkUserAdmin}
              checkUserValidate={checkUserValidate}
              checkUserVerified={checkUserVerified}
              checkUser={checkUser}
            />
          }
        />
        <Route
          path="/Register"
          element={
            <Register
              checkLogin={checkLogin}
              checkUserAdmin={checkUserAdmin}
              checkUserValidate={checkUserValidate}
              checkUserVerified={checkUserVerified}
              checkUser={checkUser}
            />
          }
        />
        <Route
          path="/ForgotPass"
          element={
            <ForgotPass
              checkLogin={checkLogin}
              checkUserAdmin={checkUserAdmin}
              checkUserValidate={checkUserValidate}
              checkUserVerified={checkUserVerified}
              checkUser={checkUser}
            />
          }
        />
        <Route
          path="/About"
          element={
            <About
              checkLogin={checkLogin}
              checkUserAdmin={checkUserAdmin}
              checkUserValidate={checkUserValidate}
              checkUserVerified={checkUserVerified}
              checkUser={checkUser}
            />
          }
        />
        <Route
          path="/Contact"
          element={
            <Contact
              checkLogin={checkLogin}
              checkUserAdmin={checkUserAdmin}
              checkUserValidate={checkUserValidate}
              checkUserVerified={checkUserVerified}
              checkUser={checkUser}
            />
          }
        />
        <Route
          path="/Verify/:token"
          element={
            <Verify
              checkLogin={checkLogin}
              checkUserAdmin={checkUserAdmin}
              checkUserValidate={checkUserValidate}
              checkUserVerified={checkUserVerified}
              checkUser={checkUser}
            />
          }
        />
        {checkLogin() && checkUserValidate() && !checkUserVerified() && (
          <Route
            path="/NotValidated"
            element={
              <NoValidate
                checkLogin={checkLogin}
                checkUserAdmin={checkUserAdmin}
                checkUserValidate={checkUserValidate}
                checkUserVerified={checkUserVerified}
                checkUser={checkUser}
              />
            }
          />
        )}
        {checkLogin() && checkUserValidate() && checkUserVerified() && (
          <>
            <Route
              path="/Home"
              element={
                <Home
                  checkLogin={checkLogin}
                  checkUserAdmin={checkUserAdmin}
                  checkUserValidate={checkUserValidate}
                  checkUserVerified={checkUserVerified}
                  checkUser={checkUser}
                  user={user}
                />
              }
            />
            <Route
              path="/MyProfile"
              element={
                <MyProfile
                  checkLogin={checkLogin}
                  checkUserAdmin={checkUserAdmin}
                  checkUserValidate={checkUserValidate}
                  checkUserVerified={checkUserVerified}
                  checkUser={checkUser}
                  user={user}
                />
              }
            />
            <Route
              path="/MyAccount"
              element={
                <MyAccount
                  checkLogin={checkLogin}
                  checkUserAdmin={checkUserAdmin}
                  checkUserValidate={checkUserValidate}
                  checkUserVerified={checkUserVerified}
                  checkUser={checkUser}
                  user={user}
                />
              }
            />
            <Route
              path="/Mail"
              element={
                <Mail
                  checkLogin={checkLogin}
                  checkUserAdmin={checkUserAdmin}
                  checkUserValidate={checkUserValidate}
                  checkUserVerified={checkUserVerified}
                  checkUser={checkUser}
                  user={user}
                />
              }
            />
          </>
        )}
        {checkLogin() &&
          checkUserValidate() &&
          checkUserAdmin() &&
          checkUserVerified() && (
            <Route
              path="/Admin"
              element={
                <Admin
                  checkLogin={checkLogin}
                  checkUserAdmin={checkUserAdmin}
                  checkUserValidate={checkUserValidate}
                  checkUserVerified={checkUserVerified}
                  checkUser={checkUser}
                />
              }
            />
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
