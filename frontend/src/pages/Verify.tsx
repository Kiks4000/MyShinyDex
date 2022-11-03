import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import ResetPswd from "../component/ResetPswd";
import { Props } from "../App";

function Verify({ checkLogin }: Props) {
  const token = useParams<{ token: string }>().token;

  const [response, setResponse] = React.useState("");

  const verifyToken = async () => {
    try {
      axios
        .get(`http://localhost:5000/api/user/passwordrecover/${token}`)
        .then((res) => {
          setResponse(res.data.message);
        })
        .catch((err) => {
          setResponse(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      <Header checkLogin={checkLogin} />
      <main className="verify-mainContainer">
        {response === "Password reset token verified." ? (
          <ResetPswd token={token} />
        ) : (
          <div className="verify-titleContainer">
            <h1 className="verify-title">{response}</h1>
            <NavLink className="verify-back" to="/">
              Back in safe Place
            </NavLink>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Verify;
