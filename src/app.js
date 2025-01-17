const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// logger and error
const { logger, handleGlobalErrors } = require("@utils/logger");
const { errors } = require("celebrate");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
// Cors Middleware
app.use(cors(corsOptions));

//production security packages
require("@startup/prod")(app);
//docs route should be above other routes
require("@docs")(app);

// require("../")
require("@startup/configCheck")();
require("@startup/logging")(app);
require("@startup/routes")(app);
require("@startup/db")();

handleGlobalErrors();
app.use(errors());

app.use(express.json());
app.use(morgan("dev")); // Logging middleware
require("@docs")(app);
require("@startup/routes")(app);

// Test route
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Server is running",
    timestamp: new Date(),
  });
});

module.exports = app;
