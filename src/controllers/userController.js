import usersRepository from "../repositories/userRepository.js";

export async function getUserById(req, res) {
  const { id } = req.params

  try {
    const { rows: profile } = await usersRepository.getUserProfile(id);
    const { rows: postsAndLikes } = await usersRepository.getPostsByUserId(id);

    /*     const obj = { profile: profile, posts: [...likes] }
        console.log(obj.profile[0].username) */

    res.status(200).send({ profile, posts: [...postsAndLikes] });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}