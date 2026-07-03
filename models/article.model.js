const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [100, "Title must be at most 100 characters long"],
    },
    content: {
      type: String,
      trim: true,
      required: true,
      minlength: [20, "Content must be at least 20 characters long"],
      maxlength: [10000, "Content must be at most 10000 characters long"],
    },
    author: {
      type: String,
      trim: true,
      required: true,
      minlength: [5, "Author must be at least 5 characters long"],
      maxlength: [100, "Author must be at most 100 characters long"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Article", articleSchema);
