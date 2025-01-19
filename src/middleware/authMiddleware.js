// src/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const config = require("@config");
const { User } = require("@models/User");

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);

    try {
      // Verify token
      const decoded = await jwt.verify(token, config.secret_key);
      console.log("Decoded Token:", decoded._id);

      // Fetch user
      const user = await User.findById(decoded._id).select("name role");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }
    next();
  };
};
