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

router.post("/articles", validate(createArticleSchema), createArticle);
router.get("/articles", getAllArticle);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", validate(updateArticleSchema), updateArticle);
router.delete("/articles/:id", deleteArticle);

module.exports = router;
