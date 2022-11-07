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
  checkLogin: () => void;
};

function App() {
  axios.defaults.withCredentials = true;

  const [user, setUser] = React.useState<User | null>(null);
  const [isLogged, setIsLogged] = React.useState(false);

  const checkLogin = () => {
    const cookies = new Cookies();
    const token = cookies.get("MyShinyToken");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };

  const getUser = () => {
    const cookies = new Cookies();
    const id = cookies.get("MyShinyID");
    if (id) {
      axios
        .get(`http://localhost:5000/api/user/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    checkLogin();
    getUser();
  }, []);

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Landing checkLogin={checkLogin} />} />
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
        {isLogged === false ? (
          <Route path="/Login" element={<Login checkLogin={checkLogin} />} />
        ) : null}

        {isLogged ? (
          <>
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
          </>
        ) : (
          <Route path="*" element={<Landing checkLogin={checkLogin} />} />
        )}
        <Route path="/Admin" element={<Admin checkLogin={checkLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
