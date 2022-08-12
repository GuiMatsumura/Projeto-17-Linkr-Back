import postRepository from "../repositories/postRepository.js";

export async function deletePost(req, res) {
  const { id } = req.params

  try {
    await postRepository.deletePostById(id);
    res.status(200).send({message: "Post deletado com sucesso!"})
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}