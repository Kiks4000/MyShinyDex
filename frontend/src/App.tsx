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
    checkUser();
    checkLogin();
    checkUserAdmin();
    checkUserVerified();
    checkUserValidate();
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
        {checkLogin() && checkUserValidate() && !checkUserVerified() && (
          <Route
            path="/NotValidated"
            element={<NoValidate checkLogin={checkLogin} />}
          />
        )}
        {checkLogin() && checkUserValidate() && checkUserVerified() && (
          <>
            <Route
              path="/Home"
              element={<Home checkLogin={checkLogin} user={user} />}
            />
            <Route
              path="/MyProfile"
              element={<MyProfile checkLogin={checkLogin} user={user} />}
            />
            <Route
              path="/MyAccount"
              element={<MyAccount checkLogin={checkLogin} user={user} />}
            />
            <Route
              path="/Mail"
              element={<Mail checkLogin={checkLogin} user={user} />}
            />
          </>
        )}
        {checkLogin() &&
          checkUserValidate() &&
          checkUserAdmin() &&
          checkUserVerified() && (
            <Route path="/Admin" element={<Admin checkLogin={checkLogin} />} />
          )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
