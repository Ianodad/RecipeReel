// src/controllers/recipeControllers.js

const recipeService = require("@services/recipeServices");

const getAllRecipesController = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes(req.query);
    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

const getRecipeByIdController = async (req, res, next) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
};

const createRecipeController = async (req, res, next) => {
  try {
    const recipe = await recipeService.createRecipe(req.body, req.user);
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    next(error);
  }
};

const updateRecipeController = async (req, res, next) => {
  try {
    const recipe = await recipeService.updateRecipe(
      req.params.id,
      req.body,
      req.user
    );
    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    next(error);
  }
};

const deleteRecipeController = async (req, res, next) => {
  try {
    await recipeService.deleteRecipe(req.params.id, req.user);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const approveRecipeController = async (req, res, next) => {
  try {
    const recipe = await recipeService.approveRecipe(req.params.id);
    res.status(200).json({ message: "Recipe approved successfully", recipe });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  updateRecipeController,
  deleteRecipeController,
  approveRecipeController,
};
