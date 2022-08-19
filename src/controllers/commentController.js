import commentRepository from "../repositories/commentRepository.js";

export async function postComment(req, res) {
  try {
    await commentRepository.postComment(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getComments(req, res) {
  const { postId } = req.params;
  try {
    const { rows: comments } = await commentRepository.getComments(postId);
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
