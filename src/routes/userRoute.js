import express from 'express';
import { userSignup } from '../controllers/signupController.js';
import { validadeSignup } from '../middlewares/validateSignup.js';

const router = express.Router();

router.post("/signup", validadeSignup, userSignup)

export default router;