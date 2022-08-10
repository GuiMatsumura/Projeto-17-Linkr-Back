import postSchema from "../schemas/postSchema";

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
  next();
}
// git add . && git commit -m "feat: putting the user picture on the jwt"
