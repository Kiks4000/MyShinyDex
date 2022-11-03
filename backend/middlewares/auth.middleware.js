const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
require("dotenv").config({ path: ".env" });

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.MyShinyToken;
  if (token === undefined) {
    return res.json({
      message: "No Token, you are not logged in",
    });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.json({
          message: "Token is not valid",
        });
      } else {
        console.log(decodedToken);
        let user = UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    console.log("No token");
    res.redirect("/login");
  }
};
