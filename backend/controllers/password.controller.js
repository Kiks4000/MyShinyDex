const User = require("../models/user.model");
const { sendEmail } = require("../utils/sgmail.utils.js");
require("dotenv").config();
const crypto = require("crypto");

// POST - /api/user/passwordrecover  - ask password recover token via email
module.exports.passwordRecover = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken: crypto.randomBytes(20).toString("hex"),
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      }
    );

    const token = await User.findOne({ email }).select("resetPasswordToken");

    const tokenToSend = token.resetPasswordToken;

    let subject = "Password change requested";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = `${process.env.CLIENT_URL}/Verify/${tokenToSend}`;
    let html = `<p>Hi ${user.username}</p>
                <p>We heard that you lost your MyShinyDex Account password. Sorry about that!</p>
                <p>But don't worry! You can use the following link within the next hour to reset your password:</p>
                <a href=${link}>${link}</a>
                <p>If you don't use this link within 1 hour, it will expire.</p>
                <p>Thanks,<br>The MyShinyDex Team</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message: "A reset email has been sent to " + user.email + ".",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - /api/user/passwordrecover/:token - verify passwordResetToken exists if exists return true else false
module.exports.verifyPasswordRecoverToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(401).json({
        message: "Password reset token is invalid or has expired.",
      });

    res.status(200).json({ message: "Password reset token verified." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - /api/user/resetpassword/:token - user enter new pass
module.exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      passwordResetToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(401).json({
        message: "Password reset token is invalid or has expired.",
      });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    let subject = "Your password has been changed";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hi ${user.username}</p>
                <p>This is a confirmation that the password for your account ${user.username} has just been changed.</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
