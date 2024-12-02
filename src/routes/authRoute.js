const express = require("express");
const router = express.Router();

const { testController } = require("@controllers/auth");

router.get("/test", testController);

module.exports = router;
