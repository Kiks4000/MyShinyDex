const router = require("express").Router();
const passController = require("../controllers/password.controller.js");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const { checkUser } = require("../middlewares/auth.middleware");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", checkUser, authController.logout);

router.get("/verify/:token", authController.verifyEmail);
router.post(
  "/verify/:token",
  checkUser,
  authController.resendVerificationEmail
);

// user
router.get("/", checkUser, userController.getAllUsers);
router.get("/:id", checkUser, userController.userInfo);

router.delete("/:id", checkUser, userController.deleteUser);

router.put("/:id/bio", checkUser, userController.updateBioUser);
router.put("/:id/username", checkUser, userController.updateUsernameUser);
router.put(
  "/:id/profilepicture",
  checkUser,
  userController.updateProfilePicture
);
router.put("/:id/quote", checkUser, userController.updateQuoteUser);

router.patch("/:id/platforms", checkUser, userController.updatePlatformsUser);
router.patch("/:id/versions", checkUser, userController.updateVersionsUser);

router.put("/:id/password", checkUser, userController.updatePasswordUser); //todo : add auth and bcrypt
router.put("/:id/mail", checkUser, userController.updateEmailUser); // todo with email verification sendGrid

// routes to add to shiny arrays
router.patch("/:id/shinylist", checkUser, userController.updateShinyList);
router.patch(
  "/:id/shinywishlist",
  checkUser,
  userController.updateShinyWishList
);
router.patch(
  "/:id/shinytradelist",
  checkUser,
  userController.updateShinyTradeList
);

// routes to remove from shiny arrays
router.patch(
  "/:id/shinylist/remove",
  checkUser,
  userController.removeShinyList
);
router.patch(
  "/:id/shinywishlist/remove",
  checkUser,
  userController.removeShinyWishList
);
router.patch(
  "/:id/shinytradelist/remove",
  checkUser,
  userController.removeShinyTradeList
);

// routes to recover password

router.post("/passwordrecover", passController.passwordRecover);
router.get(
  "/passwordrecover/:token",
  passController.verifyPasswordRecoverToken
);
router.post("/resetpassword/:token", passController.resetPassword);

module.exports = router;
