import { Router } from "express";
import userRoute from "./userRoute.js";
import postRoute from "./postRoute.js";
import likeRoute from "./likeRoute.js"

const router = Router();

router.use(userRoute);
router.use(postRoute);
router.use(likeRoute);

export default router;
