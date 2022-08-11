import postRepository from "../repositories/postRepository.js";
export async function newPost(req, res) {
  const { verified } = res.locals;
  const body = {
    userId: verified.userId,
    ...req.body,
  };
  try {
    await postRepository.createPost(body);
    res.status(201).send({ ...body, userPhoto: verified.photo });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
