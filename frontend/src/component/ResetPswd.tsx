import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPswd({ token }: { token: string | undefined }) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const comparePassword = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comparePassword()) {
      axios
        .post(`http://localhost:5000/api/user/resetpassword/${token}`, {
          password,
        })
        .then((res) => {
          console.log(res);
          setSuccess(res.data.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    } else {
      setError("Password does not match");
    }
  };
  return (
    <>
      <h1 className="resetForm-title">Reset your password</h1>
      <div className="resetForm-container">
        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="reset-formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handlePassword}
              autoComplete="off"
            />
          </div>
          <div className="reset-formGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleConfirmPassword}
              autoComplete="off"
            />
          </div>
          {error && <p className="reset-error">{error}</p>}
          {success && <p className="reset-success">{success}</p>}
          <button className="reset-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPswd;
