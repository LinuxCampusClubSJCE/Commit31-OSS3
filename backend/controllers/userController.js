const User = require("../models/userModel");

// GET /api/users/me
exports.getUserProfile = async (req, res) => {
  res.json({ message: "User profile endpoint - To be implemented with JWT" });
};
