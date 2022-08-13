import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken.js';
import { getTimeline } from '../controllers/timelineController.js';

const router = Router();

router.get('/timeline', validateToken, getTimeline);

export default router;
