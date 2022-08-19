import joi from "joi";

const commentSchema = joi.object({
  comment: joi.string().required(),
  postId: joi.number().required(),
  userId: joi.number().required(),
});

export default commentSchema;
