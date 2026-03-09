const { body } = require("express-validator");

const createUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
];

const updateProfileValidator = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("contactNumber")
    .optional()
    .isString()
    .withMessage("Contact number must be a string"),
];

const updateEmailValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newEmail")
    .isEmail()
    .withMessage("Please provide a valid email"),
];

const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];

module.exports = {
  createUserValidator,
  updateProfileValidator,
  updateEmailValidator,
  changePasswordValidator,
};