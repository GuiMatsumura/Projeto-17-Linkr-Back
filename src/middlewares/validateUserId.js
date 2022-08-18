import joi from "joi";

export function validadeUserId(req, res, next) {
  const userId = req.body;
  const followSchema = joi.object({
    id: joi.number().required(),
  });

  const { error } = followSchema.validate(userId);

  if (error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };

  next();
}