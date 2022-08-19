import joi from "joi";

const repostSchema = joi.object({
  postId: joi.number().required(),
  userId: joi.number().required(),
});

export default repostSchema;
