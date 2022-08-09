import joi from 'joi';

export const signupSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().min(1).required(),
  password: joi.string().min(6).required(),
  photo: joi.string().uri().required()
})