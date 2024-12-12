const express = require("express");
const router = express.Router();
const {
  signUpController,
  verifyEmail,
  logout,
  forgotPassword,
  login,
  resetPassword,
  checkAuth,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signUpController);
router.post("/verify-email", verifyEmail);
router.post("/logout", logout);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router; //defalut export
