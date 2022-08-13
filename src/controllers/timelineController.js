import getTimelineRepository from '../repositories/timelineRepository.js';

export async function getTimeline(req, res) {
  try {
    const posts = await getTimelineRepository.getPosts();
    res.status(200).send(posts.rows);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(
        'An error occured while trying to fetch the posts, please refresh the page'
      );
    return;
  }
}
