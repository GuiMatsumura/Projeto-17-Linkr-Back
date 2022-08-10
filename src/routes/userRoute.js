import express from 'express';
import { userSignup } from '../controllers/signupController.js';
import { userSignin } from '../controllers/signinController.js';
import { validadeSignup } from '../middlewares/validateSignup.js';

const router = express.Router();

router.post("/signup", validadeSignup, userSignup);
router.post("/signin", userSignin);

export default router;