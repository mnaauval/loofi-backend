const { check } = require("express-validator");

exports.validateUserSignUp = [
  // prettier-ignore
  check("username").trim().not().isEmpty().withMessage("Name is required").isString().withMessage("Must be a valid name").isLength({ min: 3, max: 20 }).withMessage("Username must be within 3 to 20 chars long"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid email"),
  check("password").trim().not().isEmpty().withMessage("Password is empty").isLength({ min: 6, max: 20 }).withMessage("Password must be within 6 to 20 chars long"),
  check("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirm your password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
