// src/services/ratingService.js

const Rating = require("@models/Rating");
const Recipe = require("@models/Recipe");

exports.addOrUpdateRating = async (ratingData, user) => {
  const { recipeId, value, comment } = ratingData;

  // Validate the recipe exists and is approved
  const recipe = await Recipe.findById(recipeId);
  if (!recipe || recipe.status !== "approved") {
    throw new Error("Recipe not found or not approved");
  }

  // Check if the user has already rated the recipe
  let rating = await Rating.findOne({ recipe: recipeId, user: user._id });

  if (rating) {
    // Update existing rating
    rating.value = value;
    rating.comment = comment;
  } else {
    // Create new rating
    rating = new Rating({
      recipe: recipeId,
      user: user._id,
      value,
      comment,
    });
  }

  await rating.save();

  // Recalculate average rating and ratings count
  const ratings = await Rating.find({ recipe: recipeId });
  const averageRating =
    ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

  recipe.averageRating = averageRating;
  recipe.ratingsCount = ratings.length;
  await recipe.save();

  return rating;
};

exports.getRatingsByRecipe = async (recipeId) => {
  return Rating.find({ recipe: recipeId })
    .populate("user", "name")
    .sort("-createdAt");
};

exports.deleteRating = async (recipeId, user) => {
  const rating = await Rating.findOneAndDelete({
    recipe: recipeId,
    user: user._id,
  });

  if (!rating) {
    throw new Error("Rating not found");
  }

  // Recalculate average rating and ratings count
  const ratings = await Rating.find({ recipe: recipeId });
  let averageRating = 0;
  if (ratings.length > 0) {
    averageRating =
      ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;
  }

  const recipe = await Recipe.findById(recipeId);
  recipe.averageRating = averageRating;
  recipe.ratingsCount = ratings.length;
  await recipe.save();
};
