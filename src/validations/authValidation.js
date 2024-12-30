// src/validations/authValidation.js

const { celebrate, Joi, Segments } = require("celebrate");

const errors = {
  "string.base": "{#label} must be a string",
  "string.empty": "{#label} cannot be empty",
  "string.min": "{#label} must be at least {#limit} characters long",
  "string.max": "{#label} must be at most {#limit} characters long",
  "any.required": "{#label} is a required field",
  "string.email": "{#label} must be a valid email",
  "string.pattern.base": "{#label} contains invalid characters",
  "object.unknown": "{#label} is not allowed",
};

const registerValidation = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().messages(errors),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages(errors),
      password: Joi.string().required().min(6).messages(errors),
      role: Joi.string()
        .valid("Admin", "Contributor", "Viewer")
        .optional()
        .messages(errors),
    })
    .messages(errors),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages(errors),
      password: Joi.string().required().messages(errors),
    })
    .messages(errors),
});

const forgotPasswordValidation = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages(errors),
    })
    .messages(errors),
});

const resetPasswordValidation = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      token: Joi.string().required().messages(errors),
      password: Joi.string().required().min(6).messages(errors),
    })
    .messages(errors),
});

module.exports = {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};
