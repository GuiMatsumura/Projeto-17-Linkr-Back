import usersRepository from "../repositories/userRepository.js";

export async function getUserById(req, res) {
  const { id } = req.params

  try {
    const { rows: profile } = await usersRepository.getUserProfile(id);
    const { rows: posts } = await usersRepository.getPostsFromUser(id);
    const { rows: postsAndLikes } = await usersRepository.getPostsByUserId(id);

    console.log(postsAndLikes)
    /*     const obj = { profile: profile, posts: [...likes] }
        console.log(obj.profile[0].username) */

    /* if (postsAndLikes.length === 0) {
      res.status(200).send({ profile, posts });
      return;
    } else {
      res.status(200).send({ profile, posts: [...postsAndLikes, ...posts] }); //mostra 2x o mesmo post caso ele tenha algum like
      return;
    } */

    res.status(200).send({ profile, posts })
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}