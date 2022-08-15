import joi from "joi";

const updateSchema = joi.object({
  description: joi.string().required(),
  postId: joi.number().required(),
});

export default updateSchema;
