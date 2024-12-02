const swaggerJSDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authRouteDocs = require("@docs/authDocs");

const config = require("@config");

const { port } = config;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RecipeReel API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
    tags: [{ name: "Auth", description: "Authorization and Authentication" }],
    paths: { ...authRouteDocs },
  },
  apis: ["@routes/**/*.js"],
};

const swaggerSpec = swaggerJSDocs(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

module.exports = swaggerDocs;
