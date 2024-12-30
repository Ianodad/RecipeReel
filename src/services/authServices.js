// src/services/authService.js

const { User } = require("@models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendResetEmail } = require("@utils/email");
const config = require("@config");

const registerUserService = async (userData) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email is already in use");
  }

  // Create new user
  const user = new User(userData);
  await user.save();

  // Exclude password from the returned user object
  user.password = undefined;

  return user;
};

const authenticateUserService = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = await user.generateAuthToken();
  return token;
};

const sendPasswordResetEmailService = async (email) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email not found");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Set reset token and expiry on user object
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Send reset email
  const resetUrl = `${config.clientUrl}/reset-password/${resetToken}`;
  await sendResetEmail(user.email, resetUrl);
};

const resetPasswordService = async ({ token, password }) => {
  // Find user by reset token and check if token is not expired
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  // Update password and clear reset token
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
};

module.exports = {
  registerUserService,
  authenticateUserService,
  sendPasswordResetEmailService,
  resetPasswordService,
};
