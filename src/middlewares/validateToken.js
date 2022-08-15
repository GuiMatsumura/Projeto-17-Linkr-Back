import jwt from '../token/jwt.js';

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const verified = jwt.verifyToken(token);
  if (!verified) {
    return res.status(401).send('Token inválido!');
  }
  res.locals.verified = verified;
  next();
}
