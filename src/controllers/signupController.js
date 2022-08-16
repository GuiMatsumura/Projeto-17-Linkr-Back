import usersRepository from '../repositories/userRepository.js';

export async function userSignup(req, res) {
  const { username, email, password, photo } = req.body;
  try {
    usersRepository.createUser(email, username, password, photo);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}
