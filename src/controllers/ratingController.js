// src/controllers/ratingControllers.js

const {
  addOrUpdateRatingService,
  getRatingsByRecipeService,
  deleteRatingService,
} = require("@services/ratingServices");

const addOrUpdateRatingController = async (req, res, next) => {
  try {
    const rating = await addOrUpdateRatingService(req.body, req.user);
    res.status(200).json({ message: "Rating submitted successfully", rating });
  } catch (error) {
    next(error);
  }
};

const getRatingsByRecipeController = async (req, res, next) => {
  try {
    const ratings = await getRatingsByRecipeService(req.params.recipeId);
    res.status(200).json({ ratings });
  } catch (error) {
    next(error);
  }
};

const deleteRatingController = async (req, res, next) => {
  try {
    await deleteRatingService(req.params.recipeId, req.user);
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrUpdateRatingController,
  getRatingsByRecipeController,
  deleteRatingController,
};
