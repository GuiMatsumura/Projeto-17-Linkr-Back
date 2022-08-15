import usersRepository from '../repositories/userRepository.js';
export async function getUsers(req, res) {
  try {
    const { rows: response } = await usersRepository.getUsers();
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
