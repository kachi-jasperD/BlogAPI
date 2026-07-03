const Joi = require("joi");

const createArticleSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(20).max(10000).required(),
  author: Joi.string().min(5).max(100).required(),
});

const updateArticleSchema = Joi.object({
  title: Joi.string().min(5).max(100),
  content: Joi.string().min(20).max(10000),
  author: Joi.string().min(5).max(100),
}).min(1); // Require at least one field to update

module.exports = {
  createArticleSchema,
  updateArticleSchema,
};
