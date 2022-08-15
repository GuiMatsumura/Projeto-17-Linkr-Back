import { Router } from "express";
import { validatePost, validateUpdate } from "../middlewares/validatePost.js";
import { newPost, updatePost } from "../controllers/postController.js";
const router = Router();

router.post("/post", validatePost, newPost);
router.put("/post", validateUpdate, updatePost);
export default router;
