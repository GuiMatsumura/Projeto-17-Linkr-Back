import { Router } from "express";
import { validatePost, validateUpdate } from "../middlewares/validatePost.js";
import { newPost, updatePost, deletePost } from "../controllers/postController.js";
import { validateToken } from "../middlewares/validateToken.js";
const router = Router();

router.delete("/delete/:id", validateToken, deletePost)
router.post("/post", validatePost, newPost);
router.put("/post", validateUpdate, updatePost);

export default router;

