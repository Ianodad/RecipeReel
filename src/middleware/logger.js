const { logger } = require("@utils/logger");

module.exports = function logEachRequestMethodAndUrl(req, res, next) {
  // Output info level message to the logging
  logger.info(`${req.method} request to ${req.url} received`);

  req.logMessage = `${req.method} request to ${req.url} received`;

  next(); // Pass the req and res objects to the next middleware in the "stack" (bodyParser.json middleware)
};
