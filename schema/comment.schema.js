const Joi = require("joi");

const createCommentSchema = Joi.object({
  commenter: Joi.string().min(5).max(100).required(),
  comment: Joi.string().min(1).max(500).required(),
});

module.exports = createCommentSchema;
