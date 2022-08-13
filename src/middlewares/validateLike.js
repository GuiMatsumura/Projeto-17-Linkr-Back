import likeRepository from "../repositories/likeRepository.js";
import jwt from "../token/jwt.js";

export async function validateLike(req, res, next) {

  const { postId, like } = req.body;

  const { verified } = res.locals;

  const payload = [verified.id, postId]

  const { rows: likeDb } = await likeRepository.getLike(payload);

  if (!like && likeDb[0]) {

    return res.status(409).send("Post já curtido ou não existe!");

  }

  if (like && !likeDb[0]) {

    res.status(409).send("Post inexistente!");
    return;

  }

  next();

}

export async function validateLikeAuthorizathion(req, res, next) {

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const verified = jwt.verifyToken(token);

  if (!verified) {

    return res.status(401).send("Token inválido!");

  }

  res.locals.verified = verified;

  next();

}
