// src/validations/ratingValidation.js

const { celebrate, Joi, Segments } = require("celebrate");

const ratingValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    recipeId: Joi.string().required(),
    value: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().max(500).optional(),
  }),
});

module.exports = {
  ratingValidation,
};
