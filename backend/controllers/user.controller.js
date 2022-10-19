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

// PUT - api/user/:id - update user bio
module.exports.updateBioUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// PUT - api/user/:id/mail - update user email ///// TODO with email verification sendGrid
module.exports.updateEmailUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// PUT - api/user/:id/pseudo - update user pseudo
module.exports.updateUsernameUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// PUT - api/user/:id/profilepicture - update user password
module.exports.updateProfilePicture = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// DELETE - api/user/:id/ - delete user
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
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
