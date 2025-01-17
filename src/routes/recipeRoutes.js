// src/routes/recipeRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  getRecipesByUserController,
  updateRecipeController,
  deleteRecipeController,
  approveRecipeController,
} = require("@controllers/recipeControllers");
const {
  authenticateJWT,
  authorizeRoles,
} = require("@middleware/authMiddleware");
const {
  createRecipeValidation,
  updateRecipeValidation,
} = require("../validations/recipeValidation");

// Get all recipes
router.get("/", getAllRecipesController);

// Get recipe by ID
// router.get("/:id", getRecipeByIdController);

router.get("/user", authenticateJWT, getRecipesByUserController);

// Create a new recipe (Authenticated users)
router.post(
  "/",
  authenticateJWT,
  createRecipeValidation,
  createRecipeController
);

// Update a recipe (Recipe owner or Admin)
router.put(
  "/:id",
  authenticateJWT,
  updateRecipeValidation,
  updateRecipeController
);

// Delete a recipe (Recipe owner or Admin)
router.delete("/:id", authenticateJWT, deleteRecipeController);

// Approve a recipe (Admin only)
router.patch(
  "/:id/approve",
  authenticateJWT,
  authorizeRoles("Admin"),
  approveRecipeController
);

module.exports = router;
