// src/controllers/authController.js

const {
  registerUserService,
  authenticateUserService,
  sendPasswordResetEmailService,
  resetPasswordService,
} = require("@services/authServices");

const testController = async (req, res) => {
  res.json({
    status: "success",
    message: "auth controller",
    timestamp: new Date(),
  });
};

const registerController = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const token = await authenticateUserService(req.body);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordController = async (req, res, next) => {
  try {
    await sendPasswordResetEmailService(req.body.email);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    await resetPasswordService(req.body);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  testController,
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
};
