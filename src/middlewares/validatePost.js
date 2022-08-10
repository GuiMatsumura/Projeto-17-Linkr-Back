import postSchema from "../schemas/postSchema.js";
import jwt from "../token/jwt.js";
export async function validatePost(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const verified = jwt.verifyToken(token);
  const { error } = postSchema.validate(req.body);
  console.log(verified);
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
