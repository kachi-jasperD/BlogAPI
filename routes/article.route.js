const express = require("express");

const router = express.Router();

const {
  createArticle,
  getAllArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller");

router.post("/articles", createArticle);
router.get("/articles", getAllArticle);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);

module.exports = router;
