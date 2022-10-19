module.exports.signUpErrors = (err) => {
  let errors = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  };
  if (err.message.includes("email")) errors.email = "Email is required";
  if (err.message.includes("username"))
    errors.username = "Username is required";
  if (err.message.includes("firstName"))
    errors.firstName = "First name is required";
  if (err.message.includes("lastName"))
    errors.lastName = "Last name is required";
  if (err.message.includes("password"))
    errors.password = "Password must be at least 6 characters";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email already exists";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
    errors.username = "Username already exists";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Email is required";
  if (err.message.includes("password"))
    errors.password = "Password is required";

  return errors;
};
