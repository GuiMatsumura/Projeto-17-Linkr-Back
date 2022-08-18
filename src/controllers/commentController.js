import commentRepository from "../repositories/commentRepository.js";

export async function postComment(req, res) {
  try {
    await commentRepository.postComment(req.body);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
