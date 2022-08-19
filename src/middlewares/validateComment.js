import commentSchema from "../schemas/commentSchema.js";
import jwt from "../token/jwt.js";

export default function validateComment(req, res, next) {
  const { error } = commentSchema.validate(req.body);
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const verified = jwt.verifyToken(token);
  if (error) {
    console.log(error);
    return res.status(422).send("Corpo inválido");
  }
  if (!verified) {
    return res.status(401).send("Token inválido");
  }
  next();
}
