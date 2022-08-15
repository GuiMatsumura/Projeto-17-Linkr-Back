import { Router } from 'express';
import { validateLike } from '../middlewares/validateLike.js';
import { updateLike } from '../controllers/likeController.js';

const router = Router();

router.post('/likes', validateLike, updateLike);

export default router;
