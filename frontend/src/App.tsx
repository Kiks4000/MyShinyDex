import React from "react";
import "./main.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Mail from "./pages/Mail";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/Mail" element={<Mail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
