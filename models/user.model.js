const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [5, "Author must be at least 5 characters long"],
      maxlength: [100, "Author must be at most 100 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [12, "Password must be at least 2 characters long"],
      maxlength: [100, "Author must be at most 100 characters long"],
    },
  },
  { timestamps: true },
);


module.exports = mongoose.model("User", userSchema)