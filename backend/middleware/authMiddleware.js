const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  // Minimal defensive parsing (handles extra spaces/case)
  if (typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer")) {
    const parts = authHeader.split(" ");
    token = parts.slice(1).join(" ").trim();
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Minimal debug to confirm secret/token mismatch (no secrets logged)
    if (process.env.NODE_ENV !== "production") {
      console.log("[authMiddleware] JWT_SECRET present:", Boolean(process.env.JWT_SECRET));
      console.log("[authMiddleware] Authorization header starts with Bearer:", typeof authHeader === "string" && authHeader.toLowerCase().startsWith("bearer"));
      console.log("[authMiddleware] Token length:", token.length);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    const isExpired = error && error.name === "TokenExpiredError";
    return res.status(401).json({
      message: isExpired ? "Token expired" : "Invalid token",
    });
  }
};

