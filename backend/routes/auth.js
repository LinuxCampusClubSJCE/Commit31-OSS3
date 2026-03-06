const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

/* Rate limiter for login */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: "Too many login attempts. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

/* Routes */

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);

module.exports = router;