const config = require("@config");

//use config module to get the secret key, if no secret key set, end the application
module.exports = function () {
  if (!config.secret_key) {
    throw new Error("FATAL ERROR: SECRET_KEY is not defined.");
  }

  if (!config.mongo_url) {
    throw new Error("FATAL ERROR: DB connection string not set");
  }
};
