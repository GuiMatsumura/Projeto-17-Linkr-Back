import express from 'express';
import { userSignup } from '../controllers/signupController.js';
import { userSignin } from '../controllers/signinController.js';
import { getUserById } from '../controllers/userController.js';
import { validadeSignup } from '../middlewares/validateSignup.js';
import { validateSignin } from '../middlewares/validateSignin.js';

const router = express.Router();

router.post("/signup", validadeSignup, userSignup);
router.post("/signin", validateSignin, userSignin);
router.get("/user/:id", getUserById)

export default router;