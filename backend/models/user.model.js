const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Token = require("./token.model");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Minimum username length is 3 characters"],
      maxlength: [20, "Maximum username length is 20 characters"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter a first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter a last name"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    bio: {
      type: String,
      maxlength: [200, "Maximum bio length is 200 characters"],
    },
    profilePicture: {
      type: String,
      default: "DefaultProfile",
    },
    shinyList: {
      type: [String],
    },
    shinyWishList: {
      type: [String],
    },
    shinyTradeList: {
      type: [String],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString("hex"),
  };

  return new Token(payload);
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
