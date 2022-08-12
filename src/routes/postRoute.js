import { Router } from "express";
import { deletePost } from "../controllers/postController.js";

const router = Router();

router.delete("/delete/:id", deletePost) //botar a verificação de token

export default router;