const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/user.controller");
const validate = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../schema/user.schema");

router.post("/users/sign-up", validate(registerSchema), registerUser);
router.post("/users/login", validate(loginSchema), loginUser);

module.exports = router;
