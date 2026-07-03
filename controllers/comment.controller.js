const Joi = require("joi");
const createCommentSchema = require("../schema/comment.schema");
const ArticleModel = require("../models/article.model");
const CommentModel = require("../models/comments.model");

const createComment = async (req, res, next) => {
  const { error, value } = createCommentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "validation failed",
      error: error.details[0].message,
    });
  }

  try {
    // Check that the article exists
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    // Create the comment
    const comment = await CommentModel.create({
        ...value,

      article: req.params.id,
    });

    return res.status(201).json({
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

const getComment = async (req, res, next) => {
  try {
    const comments = await CommentModel.find({
      article: req.params.id,
    });

    return res.status(200).json({
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

module.exports = { createComment, getComment, deleteComment };
