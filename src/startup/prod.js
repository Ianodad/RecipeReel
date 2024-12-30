const express = require("express");
// security modules
const helmet = require("helmet");
const compression = require("compression");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

module.exports = function (app) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  // production middlewares
  app.use(limiter);
  app.use(xss());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(cookieParser());
};
