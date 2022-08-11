import usersRepository from "../repositories/userRepository.js";

export async function getUserById(req, res) {
  const { id } = req.params

  try {
    const { rows: profile } = await usersRepository.getUserProfile(id);
    const { rows: likes } = await usersRepository.getPostsByUserId(id);

/*     const obj = { profile: profile, posts: [...likes] }
    console.log(obj.profile[0].username) */

    res.status(200).send({ profile: profile, posts: [...likes] })
  } catch (error) {

  }
}