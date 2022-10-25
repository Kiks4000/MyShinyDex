const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/sgmail.utils.js");
require("dotenv").config();

// GET - api/user - get all users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// GET - api/user/:id - get one user by id
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

// PUT - api/user/:id/bio - update user bio
module.exports.updateBioUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const { bio } = req.body;
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: bio,
        },
      },
      { new: true, setDefaultOnInsert: true, runValidators: true }
    ).then((docs) => res.status(200).json(docs));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PUT - api/user/:id/mail - update user email
module.exports.updateEmailUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const { email } = req.body;

  const user = await UserModel.findById(req.params.id);

  if (user.email === email) {
    return res.status(400).json({ message: "Email already used" });
  }

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email: email,
          isVerified: false,
        },
      },
      { new: true, setDefaultOnInsert: true, runValidators: true }
    );

    const userWithNewEmail = await UserModel.findById(req.params.id);

    await sendVerificationEmail(userWithNewEmail, req, res);

    res.status(200).json({
      message: "Email updated, we send you a verification mail",
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PUT - api/user/:id/username - update user username
module.exports.updateUsernameUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const { username } = req.body;

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: username,
        },
      },
      { new: true, setDefaultOnInsert: true, runValidators: true }
    ).then((docs) => res.status(200).json(docs));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PUT - api/user/:id/profilepicture - update user password
module.exports.updateProfilePicture = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const { profilePicture } = req.body;

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          profilePicture: profilePicture,
        },
      },
      { new: true, setDefaultOnInsert: true, runValidators: true }
    ).then((docs) => res.status(200).json(docs));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PUT - api/user/:id/quote - update user quote
module.exports.updateQuoteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const { quote } = req.body;
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          quote: quote,
        },
      },
      { new: true, setDefaultOnInsert: true, runValidators: true }
    ).then((docs) => res.status(200).json(docs));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/platforms - update user platforms list
module.exports.updatePlatformsUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          platforms: req.body.platforms,
        },
      },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).send(docs));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/platforms - update user version list
module.exports.updateVersionsUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          versions: req.body.versions,
        },
      },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).send(docs));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// DELETE - api/user/:id/ - delete user
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/shinylist - update user shiny list
module.exports.updateShinyList = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          shinyList: req.body.shinyList,
        },
      },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).send(docs));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/shinywishlist - update user shiny wish list
module.exports.updateShinyWishList = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          shinyWishList: req.body.shinyWishList,
        },
      },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).send(docs));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/shinytradelist - update user shiny trade list
module.exports.updateShinyTradeList = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          shinyTradeList: req.body.shinyTradeList,
        },
      },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).send(docs));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/shinylist/remove - remove one user shiny list
module.exports.removeShinyList = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,

      { $pull: { shinyList: req.body.shinyList } },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).json(docs));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/shinywishlist/remove - remove one user shiny wish list
module.exports.removeShinyWishList = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,

      { $pull: { shinyWishList: req.body.shinyWishList } },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).json(docs));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PATCH - api/user/:id/shinytradelist/remove - remove one user shiny trade list
module.exports.removeShinyTradeList = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,

      { $pull: { shinyTradeList: req.body.shinyTradeList } },
      { new: true, upsert: true }
    ).then((docs) => res.status(200).json(docs));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// PUT - api/user/:id/password - update user password (with old password verification)
module.exports.updatePasswordUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const user = await UserModel.findById(req.params.id);
  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword) return res.status(400).send("Invalid password.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true, upsert: true }
    );
    let subject = "Password changed";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let text = `Hello ${user.username}, \n\nYour password has been changed.\n If you did not make this change, please contact us immediately.\n\nThank You,\nTeam Shinydex`;
    let html = `<p>Hi ${user.username},</p>
        <p>Your password has been changed.</p>
        <p>If you did not request this, please contact us immediately.</p>
        <p>Thank you,</p>
        <p>Team ShinyDex</p>`;
    await sendEmail({ to, from, subject, text, html });
    res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Function to send verification email after a change of email
async function sendVerificationEmail(user, req, res) {
  try {
    const token = user.generateVerificationToken();

    await token.save();

    let subject = "Email Verification for MyShinyDex";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = `http://localhost:5000/api/user/verify/${token.token}`; // TODO change to production link
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
