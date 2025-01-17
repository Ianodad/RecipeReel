const express = require("express");
const router = express.Router();
const {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("@controllers/categoryController");
const {
  authenticateJWT,
  authorizeRoles,
} = require("@middleware/authMiddleware");
const {
  createCategoryValidation,
  updateCategoryValidation,
} = require("../validations/categoryValidation");

// Get all categories
router.get("/", getAllCategoriesController);

// Get category by ID
router.get("/:id", getCategoryByIdController);

// Create a new category (Admin only)
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("Admin"),
  createCategoryValidation,
  createCategoryController
);

// Update a category (Admin only)
router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("Admin"),
  updateCategoryValidation,
  updateCategoryController
);

// Delete a category (Admin only)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("Admin"),
  deleteCategoryController
);

module.exports = router;
