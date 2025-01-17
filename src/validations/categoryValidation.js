const { celebrate, Joi, Segments } = require("celebrate");

const createCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().trim().messages({
      "string.empty": "Name is required",
    }),
    description: Joi.string().optional().trim(),
    icon: Joi.string().optional().trim(),
  }),
});

const updateCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().trim(),
    description: Joi.string().optional().trim(),
    icon: Joi.string().optional().trim(),
  }),
});

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
};
