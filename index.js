require("module-alias/register");
const config = require("@config");
const app = require("@app");

// const PORT = process.env.PORT || 3001;
const { port, version, name, nodeEnv } = config;
app.listen(port, () => {
  console.log(`🚀 ${name} ${config.version} 🚀`);
  console.log(
    `🚀 Listening on ${port} with NODE_ENV=${nodeEnv} 🚀`
  );
  console.log(
    `🔗 Health check available at http://localhost:${port}/api/health`
  );
  console.log(
    `🔗 Documentation available at http://localhost:${port}/api-docs`
  );
});
