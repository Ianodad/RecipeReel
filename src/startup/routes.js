const { doesNotExist } = require("@middleware/does-not-exist");
const auth = require("@routes/authRoute");
module.exports = function (app) {
  // Routes
  app.use("/api/auth", auth);

  // If route does not exist
  app.use("*", doesNotExist);
  // Error handler for routes
  // app.use(error);
};
