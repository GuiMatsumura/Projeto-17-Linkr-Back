import getTimelineRepository from '../repositories/timelineRepository.js';

export async function getPostByHashtag(req, res) {
  const obj = req.body;
  try {
    const post = await getTimelineRepository.getHashtagPost(obj);
    res.status(200).send(post.rows);
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}
