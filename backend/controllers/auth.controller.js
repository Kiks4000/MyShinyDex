const UserModel = require("../models/user.model");
const Token = require("../models/token.model");
const jwt = require("jsonwebtoken");
require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const { sendEmail } = require("../utils/sgmail.utils.js");

const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

// POST - api/user/register - register a new user
module.exports.signUp = async (req, res) => {
  const {
    email,
    username,
    firstName,
    lastName,
    password,
    bio,
    profilePicture,
    quote,
    platforms,
    versions,
  } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await UserModel.create({
      email,
      username,
      firstName,
      lastName,
      password,
      bio,
      profilePicture,
      quote,
      platforms,
      versions,
    });

    await sendVerificationEmail(newUser, req, res);

    res.status(201).json({
      message:
        "An email has been sent to you, please validate your account before log in",
    });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

// POST - api/user/login - login a user
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message:
          "Your account has not been verified. Please check your email for verification",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = createToken(user._id);

    res.cookie("MyShinyToken", token, {
      httpOnly: true,
      maxAge: maxAge,
    });

    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = signInErrors(error);
    res.status(200).json({ errors });
  }
};

// GET - api/user/logout - logout a user
module.exports.logout = (req, res) => {
  res.cookie("MyShinyToken", "", { maxAge: 1 });
  res.redirect("/");
};

// GET - api/user/verify/:token - verify a user
module.exports.verifyEmail = async (req, res) => {
  if (!req.params.token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      return res.status(400).json({ message: "This Token doesn't exist" });
    }

    await UserModel.findByIdAndUpdate(token.userId, {
      isVerified: true,
    });

    await Token.findByIdAndRemove(token._id);

    res.status(200).json({ message: "User verified" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - api/user/resend - resend verification email
module.exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    await sendVerificationEmail(user, req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to send verification email
async function sendVerificationEmail(user, req, res) {
  try {
    const token = user.generateVerificationToken();

    await token.save();

    let subject = "Email Verification for MyShinyDex";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = `http://localhost:5000/api/user/verify/${token.token}`;
    let html = `<p>Hi ${user.username}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
    <br><p>If you did not request this, please ignore this email.</p>`;
    await sendEmail({ to, from, subject, html });
  } catch (error) {
    console.log(error);
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    return res.status(500).json({ message: error.message });
  }
}
