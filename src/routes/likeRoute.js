import { Router } from "express";
import { validateLike, validateLikeAuthorizathion } from "../middlewares/validateLike.js";
import { getLikePostById, updateLike } from "../controllers/likeController.js";

const router = Router();

router.post("/likes", validateLikeAuthorizathion, validateLike, updateLike);
router.get("/like-post", validateLikeAuthorizathion, getLikePostById);

export default router;
