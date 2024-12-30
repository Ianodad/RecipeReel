const { logger } = require("@utils/logger");
const logEachRequestMethodAndUrl = require("@middleware/logger");

module.exports = function (app) {
  app.use(logEachRequestMethodAndUrl);
  logger.stream = {
    write: function (message, encoding) {
      logger.info(message);
    },
  };

  app.use(
    require("morgan")("combined", {
      stream: logger.stream,
    })
  );
};
