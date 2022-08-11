import jwt from "jsonwebtoken";

export async function userSignin(req, res) {
  const { user } = res.locals;
  try {
    const JWT_KEY = process.env.JWT_SECRET;
    const EXP_TIME = process.env.TOKEN_TIME;

    const token = jwt.sign(
      { userId: user.id, email: user.email, photo: user.photo },
      JWT_KEY,
      {
        expiresIn: EXP_TIME,
      }
    );

    res.status(200).send({ token });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}
