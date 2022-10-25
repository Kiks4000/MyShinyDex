const express = require("express");
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: ".env" });
require("./config/db");

const app = express();

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors({ corsOptions }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// jwt
// app.get("*", checkUser);
// app.get("/jwtid", requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id);
// });

// user routes
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
