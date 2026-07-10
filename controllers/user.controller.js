const Joi = require("joi");
const UserModel = require("../models/user.model");
const { registerSchema, loginSchema } = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "validation failed",
      error: error.details[0].message,
    });
  }

  try {
    const { email, password, name } = req.body;

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashed,
    });

    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "validation failed",
      error: error.details[0].message,
    });
  }
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const resUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    return res.status(200).json({
      message: "logged in successfully",
      user: resUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
