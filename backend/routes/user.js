const express = require("express");
const router = express.Router();
const { query } = require("express-validator");

// Import Middlewares
const { protect } = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");

// Import Controllers
const { getUserProfile } = require("../controllers/userController");

// Validation Logic
const userQueryValidator = [
  query("id").optional().isMongoId().withMessage("Invalid user id"),
];

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private (Requires JWT + Optional ID Validation)
 */
router.get(
  "/me",
  protect,           // 1. Ensure user is logged in
  userQueryValidator, // 2. Check if query params are valid
  validateRequest,    // 3. Catch validation errors
  getUserProfile      // 4. Execute business logic
);

module.exports = router;