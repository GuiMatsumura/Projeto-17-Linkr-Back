import connection from "../dbStrategy/postgres.js";
import usersRepository from "../repositories/userRepository.js";
import userRepository from "../repositories/userRepository.js"

export async function getUserById(req, res) {
  const { id } = req.params

  try {
    const { rows: profile } = await usersRepository.getUserProfile(id);
    const { rows: likes } = await usersRepository.getPostsByUserId(id);

/*     const obj = { profile: profile, posts: [...likes] }
    console.log(obj.profile[0].username) */

    res.status(200).send({ profile: profile, posts: [...likes] })
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export async function followUserById (req, res){
  const accountFollowed = req.params.id;
  const whoFollowed = req.body.id;
  

  try {
    await userRepository.followUser(accountFollowed, whoFollowed);
    const {rows: follower} = await userRepository.isUserFollowed(whoFollowed);

    /* console.log(follower) */
    /* if(follower.length === 0){
      return 
    } */

    res.status(200).send(follower);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}