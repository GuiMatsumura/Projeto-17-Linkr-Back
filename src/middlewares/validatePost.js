import repostSchema from "../schemas/repostSchema.js";
import postSchema from "../schemas/postSchema.js";
import updateSchema from "../schemas/updateSchema.js";
import jwt from "../token/jwt.js";
export async function validatePost(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const verified = jwt.verifyToken(token);
  const { error } = postSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(422).send("Corpo inválido");
  }
  if (!verified) {
    return res.status(401).send("Token inválido!");
  }
  res.locals.verified = verified;
  next();
}

export async function validateUpdate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const verified = jwt.verifyToken(token);
  const { error } = updateSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(422).send("Corpo inválido");
  }
  if (!verified) {
    return res.status(401).send("Token inválido!");
  }
  next();
}

export function validadeRepost(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const verified = jwt.verifyToken(token);
  const { error } = repostSchema.validate(req.body);

  if (error) {
    console.log(error)
    return res.status(422).send(error.details);
  }
  if (!verified) {
    return res.status(401).send("Token inválido!");
  }
  next();
}
