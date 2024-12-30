const packageJson = require("@root/package.json");
require("dotenv").config();

const config = {
  version: packageJson.version,
  name: packageJson.name,
  description: packageJson.description,

  nodeEnv: process.env["NODE_ENV"] ?? "development",
  port: process.env["PORT"] ?? 4000,
  mongo_url:
    process.env["MONGO_URL"] ?? "mongodb://localhost:27017/recipe-reel",
  secret_key: process.env["JWT_SECRET"],
  emailService: process.env["EMAIL_SERVICE"],
  emailUser: process.env["EMAIL_USER"],
  emailPassword: process.env["EMAIL_PASSWORD"],
  emailFrom: process.env["EMAIL_FROM"],
  clientUrl: process.env["CLIENT_URL"],

  clientOrigins: {
    test: process.env["DEV_ORIGIN"] ?? "*",
    development: process.env["DEV_ORIGIN"] ?? "*",
    production: process.env["PROD_ORIGIN"] ?? "none",
  },
};

module.exports = config;
