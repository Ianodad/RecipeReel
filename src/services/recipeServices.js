// src/services/recipeService.js

const Recipe = require("@models/Recipe");

const getAllRecipesService = async (query) => {
  const { search, category, sortBy, page = 1, limit = 10 } = query || {};

  const filter = { status: "approved" };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  const options = {
    sort: { createdAt: -1 },
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  if (sortBy) {
    options.sort = { [sortBy]: -1 };
  }

  const recipes = await Recipe.paginate(filter, options);
  return {
    ...recipes,
    totalPages: Math.ceil(recipes.totalDocs / limit),
  };
};

const getRecipeByIdService = async (recipeId) => {
  return Recipe.findById(recipeId)
    .populate("createdBy", "name")
    .where("status")
    .equals("approved");
};

//create a getRecipesByUserService that take user id adn rertuns all recipe created by user

const getRecipesByUserService = async (userId) => {
  return Recipe.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .populate("createdBy", "name")
    .where("status")
    .equals("approved");
};

const createRecipeService = async (recipeData, user) => {
  console.log(recipeData, user);
  const recipe = new Recipe({
    ...recipeData,
    createdBy: user._id,
    status: user.role === "Admin" ? "approved" : "approved",
  });
  return recipe.save();
};

const updateRecipeService = async (recipeId, updateData, user) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (
    recipe.createdBy.toString() !== user._id.toString() &&
    user.role !== "Admin"
  ) {
    throw new Error("Unauthorized to update this recipe");
  }

  Object.assign(recipe, updateData);
  return recipe.save();
};

const deleteRecipeService = async (recipeId, user) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (
    recipe.createdBy.toString() !== user._id.toString() &&
    user.role !== "Admin"
  ) {
    throw new Error("Unauthorized to delete this recipe");
  }

  await Recipe.deleteOne({ _id: recipeId });
  return { message: "Recipe deleted successfully" };
};

// add a controller that  get featured recipe

const getFeaturedRecipesService = async () => {
  return Recipe.find({ isFeatured: true })
    .populate("createdBy", "name")
    .sort({ createdAt: -1 });
};

const approveRecipeService = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  recipe.status = "approved";
  return recipe.save();
};

module.exports = {
  getAllRecipesService,
  getRecipeByIdService,
  createRecipeService,
  getRecipesByUserService,
  updateRecipeService,
  deleteRecipeService,
  approveRecipeService,
  getFeaturedRecipesService,
};
