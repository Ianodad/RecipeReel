// src/validations/recipeValidation.js

const { celebrate, Joi, Segments } = require("celebrate");

const ingredientSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.string().required(),
  unit: Joi.string().required(),
});

const createRecipeValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    ingredients: Joi.array().items(ingredientSchema).required(),
    instructions: Joi.string().required(),
    category: Joi.string().optional(),
    prepTime: Joi.number().optional(),
    cookTime: Joi.number().optional(),
    servings: Joi.number().optional(),
    image: Joi.string().optional(),
  }),
});

const updateRecipeValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    ingredients: Joi.array().items(ingredientSchema).optional(),
    instructions: Joi.string().optional(),
    category: Joi.string().optional(),
    prepTime: Joi.number().optional(),
    cookTime: Joi.number().optional(),
    servings: Joi.number().optional(),
    image: Joi.string().optional(),
  }),
});

module.exports = {
  createRecipeValidation,
  updateRecipeValidation,
};
