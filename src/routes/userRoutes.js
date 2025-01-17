// src/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllUsersController,
  getUserByIdController,
  getCurrentUserController,
  updateUserController,
  updateUserRoleController,
  deleteUserController,
} = require("@controllers/userControllers");
const {
  authenticateJWT,
  authorizeRoles,
} = require("@middleware/authMiddleware");
const {
  updateUserValidation,
  updateUserRoleValidation,
} = require("@validations/userValidation");

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

// Update user role (Admin only)
router.patch(
  "/:id/role",
  authenticateJWT,
  authorizeRoles("Admin"), // Ensure only Admins can access this route
  updateUserRoleValidation,
  updateUserRoleController
);

// Delete user (Admin only)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("Admin"),
  deleteUserController
);

module.exports = router;
