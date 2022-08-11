import { Router } from "express";
import { validatePost } from "../middlewares/validatePost.js";
import { newPost } from "../controllers/postController.js";
const router = Router();

router.post("/post", validatePost, newPost);

export default router;
