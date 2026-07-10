const express = require("express");

const router = express.Router();

const {
  createArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller");

const validate = require("../middlewares/validator");
const {
  createArticleSchema,
  updateArticleSchema,
} = require("../schema/article.schema");
const requireAuth = require("../middlewares/requireAuth");

router.post(
  "/articles",
  requireAuth,
  validate(createArticleSchema),
  createArticle,
);
router.get("/articles", requireAuth, getAllArticle);
router.get("/articles/:id", requireAuth, getArticleById);
router.put(
  "/articles/:id",
  requireAuth,
  validate(updateArticleSchema),
  updateArticle,
);
router.delete("/articles/:id", requireAuth, deleteArticle);

module.exports = router;
