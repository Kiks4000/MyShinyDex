const express = require("express");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: ".env" });
require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// user routes
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
