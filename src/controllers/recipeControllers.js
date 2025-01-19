// src/controllers/recipeControllers.js

const {
  getAllRecipesService,
  getRecipeByIdService,
  createRecipeService,
  updateRecipeService,
  deleteRecipeService,
  approveRecipeService,
  getRecipesByUserService,
} = require("@services/recipeServices");

const getAllRecipesController = async (req, res, next) => {
  console.log("req.query", req.query);
  try {
    const { docs, ...rest } = await getAllRecipesService(req.query);
    res.status(200).json({ recipes: docs, totalPages: rest.totalPages });
  } catch (error) {
    next(error);
  }
};

const getRecipeByIdController = async (req, res, next) => {
  console.log("req.params.id", req.params.id);
  try {
    const recipe = await getRecipeByIdService(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
};

//add a controller that gets all recipe created by user by user id
const getRecipesByUserController = async (req, res, next) => {
  console.log("req.user", req.user.id);
  try {
    const recipes = await getRecipesByUserService(req.user.id);
    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

const createRecipeController = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const recipe = await createRecipeService(req.body, req.user);
    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const updateRecipeController = async (req, res, next) => {
  try {
    const recipe = await updateRecipeService(req.params.id, req.body, req.user);
    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    next(error);
  }
};

const deleteRecipeController = async (req, res, next) => {
  try {
    await deleteRecipeService(req.params.id, req.user);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const approveRecipeController = async (req, res, next) => {
  try {
    const recipe = await approveRecipeService(req.params.id);
    res.status(200).json({ message: "Recipe approved successfully", recipe });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  getRecipesByUserController,
  updateRecipeController,
  deleteRecipeController,
  approveRecipeController,
};
