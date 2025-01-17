const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: String,
    icon: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Virtual field to count the number of recipes in a category
categorySchema.virtual("recipeCount", {
  ref: "Recipe", // The model to use
  localField: "_id", // Field in Category schema
  foreignField: "category", // Field in Recipe schema that references Category
  count: true, // Return the number of matching documents
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
