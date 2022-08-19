import { Router } from "express";
import validateComment from "../middlewares/validateComment.js";
import {
  getComments,
  postComment,
  getFollowing,
} from "../controllers/commentController.js";
const router = Router();

router.post("/comment", validateComment, postComment);
router.get("/comments/:postId", getComments);
router.get("/following/:userId", getFollowing);

export default router;
