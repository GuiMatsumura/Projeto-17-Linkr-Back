import { Router } from "express";
import userRoute from "./userRoute.js";
import postRoute from "./postRoute.js";
import timelineRoute from "./timelineRoute.js";
import likeRoute from "./likeRoute.js";
import commentRoute from "./commentRoute.js";
const router = Router();

router.use(userRoute);
router.use(postRoute);
router.use(timelineRoute);
router.use(likeRoute);
router.use(commentRoute);
export default router;
