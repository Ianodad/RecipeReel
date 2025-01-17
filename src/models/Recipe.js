// src/models/Recipe.js

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const ingredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    ingredients: [ingredientSchema],
    instructions: {
      type: String,
      required: true,
    },
    category: String,
    prepTime: Number, // in minutes
    cookTime: Number, // in minutes
    servings: Number,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "removed"],
      default: "pending",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
recipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Recipe", recipeSchema);
