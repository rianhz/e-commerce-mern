import express from "express";
import {
	getProfile,
	loginUser,
	registerUser,
	logoutUser,
	getAllUsers,
	deleteUser,
	refreshToken,
} from "../../controller/userAction";

import { verifyToken } from "../../middleware/verifyToken";
import { verifySuperAdmin } from "../../middleware/verifyAdmin";

const userRouter = express.Router();

userRouter.get("/", verifyToken, verifySuperAdmin, getAllUsers);
userRouter.delete("/:id", verifyToken, verifySuperAdmin, deleteUser);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.get("/refresh", refreshToken, verifyToken, getProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
