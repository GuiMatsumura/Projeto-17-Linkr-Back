import joi from "joi";

export const followSchema = joi.object({
  id: joi.number().required(),
})