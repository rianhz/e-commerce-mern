import express from "express";

import {
	loginUser,
	registerUser,
	logoutUser,
	getAllUsers,
	deleteUser,
} from "../../controller/userAction";

import { verifyToken } from "../../middleware/verifyToken";
import { verifySuperAdmin } from "../../middleware/verifyAdmin";

const userRouter = express.Router();

userRouter.get("/", verifyToken, verifySuperAdmin, getAllUsers);
userRouter.delete("/:id", verifyToken, verifySuperAdmin, deleteUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
