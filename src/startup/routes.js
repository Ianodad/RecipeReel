const { doesNotExist } = require("@middleware/does-not-exist");
const auth = require("@routes/authRoutes");
const userRoutes = require("@routes/userRoutes");
const recipeRoutes = require("@routes/recipeRoutes");
const ratingRoutes = require("@routes/ratingRoutes");
module.exports = function (app) {
  // Routes
  app.use("/api/auth", auth);
  app.use("/api/users", userRoutes);
  app.use("/recipes", recipeRoutes);
  app.use("/ratings", ratingRoutes);

  // If route does not exist
  app.use("*", doesNotExist);
  // Error handler for routes
  // app.use(error);
};
