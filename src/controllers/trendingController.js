import getTimelineRepository from '../repositories/timelineRepository.js';

export async function getTrending(req, res) {
  try {
    const trending = await getTimelineRepository.getTrending();
    res.status(200).send(trending.rows);
  } catch (err) {
    res.status(500).send(err);
    return;
  }
}
