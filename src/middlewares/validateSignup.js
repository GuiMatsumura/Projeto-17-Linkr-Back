import { signupSchema } from "../schemas/signupSchema.js";
import usersRepository from "../repositories/userRepository.js";

export async function validadeSignup (req, res, next){
  const signupData = req.body;
  const validation = signupSchema.validate(signupData);

  if (validation.error) {
    return res.status(422).send(validation.error.details.map(detail => detail.message))
  };

  const checkEmail = usersRepository.getUserByEmail(signupData.email);

  if (checkEmail.rows.length !== 0) {
    return res.sendStatus(409);
  };

  /* res.locals.signupData = signupData; */
  next();
};