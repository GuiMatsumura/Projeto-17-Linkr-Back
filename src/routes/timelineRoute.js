import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { getTimeline } from '../controllers/timelineController.js';
import { getTrending } from '../controllers/trendingController.js';
import { getPostByHashtag } from '../controllers/HashtagsController.js';

const router = Router();

router.get('/timeline', getTimeline);
router.get('/trending', getTrending);
router.get('/hashtag/:hashtag', getPostByHashtag);

export default router;
