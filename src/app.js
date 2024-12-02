const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cors());
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
