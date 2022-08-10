import postSchema from "../schemas/postSchema";

export async function validatePost(req, res, next) {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(422).send(error);
  }
}
