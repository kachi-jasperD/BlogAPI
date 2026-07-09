const Joi = require("joi");
const ArticleModel = require("../models/article.model");
const {
  createArticleSchema,
  updateArticleSchema,
} = require("../schema/article.schema");

const createArticle = async (req, res, next) => {
  const { error, value } = createArticleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "validation failed",
      error: error.details[0].message,
    });
  }

  try {
    const newArticle = new ArticleModel(value);
    await newArticle.save();

    return res.status(201).json({
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

const getAllArticle = async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  // add query code here

  try {
    const articles = await ArticleModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: "Article retrieved successfully",
      data: articles,
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

const getArticleById = async (req, res, next) => {
  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: `Article with ${req.params.id} not found`,
      });
    }

    return res.status(200).json({
      message: "Article retrieved successfully",
      data: article,
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  const { error, value } = updateArticleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message:
        "Validation failed, please provide valid article title and content",
    });
  }

  try {
    const updateArticle = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true },
    );
    if (!updateArticle) {
      return res.status(404).json({
        message: `Article with ${req.params.id} not found`,
      });
    }

    return res.status(200).json({
      message: "Article updated successfully",
      data: updateArticle,
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const deleteArticle = await ArticleModel.findByIdAndDelete(req.params.id);

    if (!deleteArticle) {
      return res.status(404).json({
        message: `Article with ${req.params.id} not found`,
      });
    }

    return res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.log("this is the error", error);
    console.error("Error retrieving article by ID:", error);
    next(error);
  }
};

module.exports = {
  createArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
};
