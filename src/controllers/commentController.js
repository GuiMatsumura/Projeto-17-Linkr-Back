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