import getTimelineRepository from '../repositories/timelineRepository.js';

export async function getPostByHashtag(req, res) {
  const { hashtag } = req.params;
  try {
    const post = await getTimelineRepository.getHashtagPost(hashtag);
    res.status(200).send(post.rows);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
    return;
  }
}
