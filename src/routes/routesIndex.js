import { Router } from 'express';
import userRoute from './userRoute.js';
import postRoute from './postRoute.js';
import timelineRoute from './timelineRoute.js';

const router = Router();

router.use(userRoute);
router.use(postRoute);
router.use(timelineRoute);

export default router;
