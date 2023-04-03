import express from "express";
import {
	getProfile,
	loginUser,
	registerUser,
	logoutUser,
} from "../../controller/userAction";

import { refreshToken, verifyToken } from "../../middleware/auth";

const userRouter = express.Router();

userRouter.get("/profile", verifyToken, getProfile);
userRouter.get("/refresh", refreshToken, verifyToken, getProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyToken, logoutUser);

export default userRouter;
