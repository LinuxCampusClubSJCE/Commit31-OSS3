const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

// Import Controllers
const { registerUser, loginUser } = require("../controllers/authController");

// Import Middlewares & Validators
const validateRequest = require("../middlewares/validateRequest");
const { registerValidator, loginValidator } = require("../middlewares/authValidator"); // Assuming your validators are here

/** * Rate limiter for login to prevent brute-force attacks
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: "Too many login attempts. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

/* --- Routes --- */

// Register Route: Validation -> Execution
router.post(
  "/register",
  registerValidator,
  validateRequest,
  registerUser
);

// Login Route: Rate Limit -> Validation -> Execution
router.post(
  "/login",
  loginLimiter,
  loginValidator,
  validateRequest,
  loginUser
);

module.exports = router;