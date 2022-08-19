import { followSchema } from "../schemas/followSchema.js";

export function validadeUserId(req, res, next) {
  const userId = req.body;
  const validation = followSchema.validate(userId);

  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };

  next();
}