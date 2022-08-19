import { Router } from "express";
import validateComment from "../middlewares/validateComment.js";
import { getComments, postComment } from "../controllers/commentController.js";
const router = Router();

router.post("/comment", validateComment, postComment);
router.get("/comments/:postId", getComments);

export default router;
