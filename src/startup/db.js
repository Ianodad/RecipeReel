const mongoose = require("mongoose");
const config = require("@config");
const { logger } = require("@utils/logger");

// MongoDB connection configuration
module.exports = async function () {
  const db = config.mongo_url; // Ensure this value is correctly set in your configuration
  if (!db) {
    logger.error("MongoDB connection string (mongo_url) is missing in config.");
    process.exit(1); // Exit the process if the connection string is missing
  }

  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`Connected to MongoDB at ${db}...`);
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }

  // Optionally, handle disconnection
  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB connection lost. Retrying...");
  });
};
