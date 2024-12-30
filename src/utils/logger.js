/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// const winston = require("winston");
// require('winston-mongodb');
require("winston-mongodb");
require("express-async-errors");

const config = require("@config");

const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
  format.colorize(),
  format.simple(),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const mongoDBFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
  format.colorize(),
  format.simple(),
  format.printf(
    (mongoDB) => `${mongoDB.timestamp} ${mongoDB.level}: ${mongoDB.message}`
  )
);
// Error
let logger = createLogger({
  transports: [
    new transports.Console({
      colorize: true,
      prettyPrint: true,
      level: "info",
      handleExceptions: true,
      format: myFormat,
    }),
    new transports.MongoDB({
      level: "error",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      db: config.mongo_url,
      format: mongoDBFormat,
    }),
  ],

  exceptionHandlers: [
    new transports.Console({ colorize: true, prettyPrint: true }),

    new transports.MongoDB({
      db: config.mongo_url,
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      level: "error",
      collection: "error",
      storeHost: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  new transports.File({
    level: "error",
    filename: "logs/error.log",
    format: format.combine(format.colorize(), format.simple()),
  });
}

function handleGlobalErrors() {
  process.on("uncaughtException", (ex) => {
    console.log("Uncaught exception!");
    logger.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    console.log("Unhandled rejection!");
    logger.error(ex.message, ex);
    process.exit(1);
  });
}

module.exports = { handleGlobalErrors, logger };
// module.exports.handleGlobalErrors = handleGlobalErrors;
