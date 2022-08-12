import { Router } from "express";
import { validateLike } from "../middlewares/validateLike.js";
import { postLike } from "../controllers/likeController.js";

const router = Router();

router.post("/post", validateLike, postLike);

export default router;
