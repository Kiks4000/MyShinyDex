import React from "react";
import axios from "axios";

function ForgotForm() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/user/passwordrecover", {
        email: email,
      })
      .then((res) => {
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <h1 className="recover-title">Forgot your password ?</h1>
      <div className="recover-formContainer">
        <form className="recover-form" onSubmit={handleSubmit}>
          <div className="recover-formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChangeEmail}
            />
            {error ? (
              <p className="error">{error}</p>
            ) : success ? (
              <p className="succes">{success}</p>
            ) : null}
          </div>
          <button className="recover-btn" type="submit">
            Send Password Recover
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotForm;
