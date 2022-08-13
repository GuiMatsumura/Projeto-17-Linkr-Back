import { Router } from "express";
import { validateDeslike, validateLike } from "../middlewares/validateLike.js";
import { deleteLike, postLike } from "../controllers/likeController.js";

const router = Router();

router.post("/likes", validateLike, postLike);
router.delete("/likes", validateDeslike, deleteLike);

export default router;
