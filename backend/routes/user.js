const express = require("express");
const router = express.Router();
const { query } = require("express-validator");

// Import Middlewares
const { protect } = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");

// Import Controllers
const {
  getUserProfile,
  updateProfile,
  updateEmail,
  changePassword,
} = require("../controllers/userController");

// Import Validators
const {
  updateProfileValidator,
  updateEmailValidator,
  changePasswordValidator,
} = require("../validators/userValidator");

// Validation Logic
const userQueryValidator = [
  query("id").optional().isMongoId().withMessage("Invalid user id"),
];

/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get(
  "/me",
  protect,
  userQueryValidator,
  validateRequest,
  getUserProfile
);

/**
 * @route   PATCH /api/users/profile
 * @desc    Update name and/or contactNumber
 * @access  Private
 */
router.patch(
  "/profile",
  protect,
  updateProfileValidator,
  validateRequest,
  updateProfile
);

/**
 * @route   PATCH /api/users/email
 * @desc    Update email (requires current password)
 * @access  Private
 */
router.patch(
  "/email",
  protect,
  updateEmailValidator,
  validateRequest,
  updateEmail
);

/**
 * @route   PATCH /api/users/password
 * @desc    Change password (requires current password)
 * @access  Private
 */
router.patch(
  "/password",
  protect,
  changePasswordValidator,
  validateRequest,
  changePassword
);

module.exports = router;