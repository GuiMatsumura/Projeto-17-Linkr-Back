import { Router } from "express";
import userRoute from "./userRoute.js";
import postRoute from "./postRoute.js";

const router = Router();

router.use(userRoute);
router.use(postRoute);

export default router;
