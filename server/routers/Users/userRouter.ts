import express from "express";
import {
	getProfile,
	loginUser,
	registerUser,
	logoutUser,
} from "../../controller/userAction";

import { verifyToken } from "../../middleware/verifyToken";

const userRouter = express.Router();

// userRouter.get("/refresh", refreshToken, verifyToken, getProfile);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
