const router = require("express").Router();
const passController = require("../controllers/password.controller.js");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

router.get("/verify/:token", authController.verifyEmail);
router.post("/verify/:token", authController.resendVerificationEmail);

// user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);

router.delete("/:id", userController.deleteUser);

router.put("/:id/bio", userController.updateBioUser);
router.put("/:id/username", userController.updateUsernameUser);
router.put("/:id/profilepicture", userController.updateProfilePicture);

router.put("/:id/password", userController.updatePasswordUser); //todo : add auth and bcrypt
router.put("/:id/mail", userController.updateEmailUser); // todo with email verification sendGrid

// routes to add to shiny arrays
router.patch("/:id/shinylist", userController.updateShinyList);
router.patch("/:id/shinywishlist", userController.updateShinyWishList);
router.patch("/:id/shinytradelist", userController.updateShinyTradeList);

// routes to remove from shiny arrays
router.patch("/:id/shinylist/remove", userController.removeShinyList);
router.patch("/:id/shinywishlist/remove", userController.removeShinyWishList);
router.patch("/:id/shinytradelist/remove", userController.removeShinyTradeList);

// routes to recover password

router.post("/passwordrecover", passController.passwordRecover);
router.get(
  "/passwordrecover/:token",
  passController.verifyPasswordRecoverToken
);
router.post("/resetpassword/:token", passController.resetPassword);

module.exports = router;
