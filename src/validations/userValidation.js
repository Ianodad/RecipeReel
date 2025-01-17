// src/validations/userValidation.js

const { celebrate, Joi, Segments } = require("celebrate");

const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().optional(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .optional(),
      role: Joi.string().valid("Admin", "Contributor", "Viewer").optional(),
    })
    .min(1), // Require at least one field to update
});

const updateUserRoleValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    role: Joi.string()
      .valid("Admin", "Contributor", "Viewer")
      .required()
      .messages({
        "any.only": "Role must be one of Admin, Contributor, Viewer",
      }),
  }),
});

module.exports = {
  updateUserValidation,
  updateUserRoleValidation,
};
