import { Router } from "express";
import { validateLike, validateLikeAuthorizathion } from "../middlewares/validateLike.js";
import { getLike, getLikePostById, updateLike } from "../controllers/likeController.js";

const router = Router();

router.post("/likes", validateLikeAuthorizathion, validateLike, updateLike);
router.get("/likes/:ID_POST", validateLikeAuthorizathion, getLike);
router.get("/likes/many/:ID_POST", getLikePostById);

export default router;
