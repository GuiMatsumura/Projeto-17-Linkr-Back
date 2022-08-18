import { Router } from "express";
import validateComment from "../middlewares/validateComment.js";
import { postComment } from "../controllers/commentController.js";
const router = Router();

router.post("/comment", validateComment, postComment);

export default router;
