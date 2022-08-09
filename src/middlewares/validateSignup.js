import { signupSchema } from "../schemas/signupSchema.js";
import usersRepository from "../repositories/userRepository.js";

export async function validadeSignup(req, res, next) {
  const signupData = req.body;
  const validation = signupSchema.validate(signupData);

  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };

  const checkEmail = await usersRepository.getUserByEmail(signupData.email)
  const checkUsername = await usersRepository.getUserByUsername(signupData.username)

  if (checkEmail.rows.length != 0) {
    return res.status(409).send({ errorMessage: "E-mail já cadastrado." });
  };

  if (checkUsername.rows.length != 0) {
    return res.status(409).send({ errorMessage: "Username já cadastrado." });
  };

  res.locals.signupData = signupData;
  next();
};