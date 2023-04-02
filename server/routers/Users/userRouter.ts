import express from "express";
import {
	getProfile,
	loginUser,
	registerUser,
} from "../../controller/userAction";

import { verifyToken } from "../../middleware/auth";

const userRouter = express.Router();

userRouter.get("/profile", verifyToken, getProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
