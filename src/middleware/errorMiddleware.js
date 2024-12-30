// src/middleware/errorMiddleware.js

const { isCelebrateError } = require("celebrate");

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const validationErrors = [];

    for (const [segment, joiError] of err.details.entries()) {
      joiError.details.forEach((detail) => {
        validationErrors.push({
          segment,
          message: detail.message.replace(/["']/g, ""),
          path: detail.path,
        });
      });
    }

    return res.status(400).json({ errors: validationErrors });
  }

  // Handle other errors
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};
