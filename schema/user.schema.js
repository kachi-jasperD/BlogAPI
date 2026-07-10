const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).+$"),
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain an uppercase letter, a lowercase letter, a number, and a special character.",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).+$"),
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain an uppercase letter, a lowercase letter, a number, and a special character.",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
