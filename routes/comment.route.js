const express = require("express");

const router = express.Router();

const {
  createComment,
  getComment,
  deleteComment,
} = require("../controllers/comment.controller");

router.post("/articles/:id/comments", createComment);
router.get("/articles/:id/comments", getComment);
router.delete("/comments/:id", deleteComment);

module.exports = router;
