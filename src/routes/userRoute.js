import express from "express";
import { userSignup } from "../controllers/signupController.js";
import { userSignin } from "../controllers/signinController.js";
import { getUserById, followUserById } from "../controllers/userController.js";
import { validadeSignup } from "../middlewares/validateSignup.js";
import { validateSignin } from "../middlewares/validateSignin.js";
import { getUsers } from "../controllers/usersController.js";
import { validadeUserId } from "../middlewares/validateUserId.js";
const router = express.Router();

router.post("/signup", validadeSignup, userSignup);
router.post("/signin", validateSignin, userSignin);
router.get("/user/:id", getUserById);
router.get("/users", getUsers);
router.post("/follow/:id", validadeUserId, followUserById);

export default router;
