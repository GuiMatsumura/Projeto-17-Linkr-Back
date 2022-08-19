import { Router } from "express";
import {
  validatePost,
  validateUpdate,
  validadeRepost,
} from "../middlewares/validatePost.js";
import {
  newPost,
  updatePost,
  deletePost,
  newRepost,
} from "../controllers/postController.js";
import { validateToken } from "../middlewares/validateToken.js";
const router = Router();

router.delete("/delete/:id", validateToken, deletePost);
router.post("/post", validatePost, newPost);
router.put("/post", validateUpdate, updatePost);
router.post("/repost", validadeRepost, newRepost);
export default router;
