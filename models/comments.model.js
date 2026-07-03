const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    commenter: {
      type: String,
      trim: true,
      required: true,
      minlength: [5, "Commenter must be at least 5 characters long"],
      maxlength: [100, "Commenter must be at most 100 characters long"],
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
