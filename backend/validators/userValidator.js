const { body } = require("express-validator");

const createUserValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
];

module.exports = { createUserValidator };