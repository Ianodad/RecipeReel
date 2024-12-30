const express = require("express");
const router = express.Router();

const {
  testController,
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("@controllers/authControllers");
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("@validations/authValidation");

router.get("/test", testController);

// Register a new user
router.post("/register", registerValidation, registerController);

// User login
router.post("/login", loginValidation, loginController);

// Forgot password
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  forgotPasswordController
);

// Reset password
router.post(
  "/reset-password",
  resetPasswordValidation,
  resetPasswordController
);

module.exports = router;
