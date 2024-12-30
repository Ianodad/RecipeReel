// src/routes/ratingRoutes.js

const express = require("express");
const router = express.Router();
const {
  getRatingsByRecipeController,
  addOrUpdateRatingController,
  deleteRatingController,
} = require("@controllers/ratingController");
const { authenticateJWT } = require("@middleware/authMiddleware");
const { ratingValidation } = require("@validations/ratingValidation");

// Add or update a rating (Authenticated users)
router.post(
  "/",
  authenticateJWT,
  ratingValidation,
  addOrUpdateRatingController
);

// Get ratings for a recipe
router.get("/recipe/:recipeId", getRatingsByRecipeController);

// Delete a rating (Authenticated users)
router.delete("/recipe/:recipeId", authenticateJWT, deleteRatingController);

module.exports = router;
