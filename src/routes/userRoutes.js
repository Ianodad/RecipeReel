// src/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllUsersController,
  getUserByIdController,
  getCurrentUserController,
  updateUserController,
  deleteUserController,
} = require("@controllers/userControllers");
const {
  authenticateJWT,
  authorizeRoles,
} = require("@middleware/authMiddleware");
const { updateUserValidation } = require("@validations/userValidation");

// Get all users (Admin only)
router.get(
  "/",
  authenticateJWT,
  authorizeRoles("Admin"),
  getAllUsersController
);

// router.get(
//   "/",
//   authenticateJWT,
//   authorizeRoles("Admin"),
//   getAllUsersController
// );

// Get current user profile
router.get("/me", authenticateJWT, getCurrentUserController);

// Get user by ID (Admin or self)
router.get("/:id", authenticateJWT, getUserByIdController);

// Update user (Admin or self)
router.put("/:id", authenticateJWT, updateUserValidation, updateUserController);

// Delete user (Admin only)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("Admin"),
  deleteUserController
);

module.exports = router;
