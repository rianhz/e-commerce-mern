"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAction_1 = require("../../controller/userAction");
const verifyToken_1 = require("../../middleware/verifyToken");
const verifyAdmin_1 = require("../../middleware/verifyAdmin");
const userRouter = express_1.default.Router();
userRouter.get("/", verifyToken_1.verifyToken, verifyAdmin_1.verifySuperAdmin, userAction_1.getAllUsers);
userRouter.delete("/:id", verifyToken_1.verifyToken, verifyAdmin_1.verifySuperAdmin, userAction_1.deleteUser);
userRouter.post("/register", userAction_1.registerUser);
userRouter.post("/login", userAction_1.loginUser);
userRouter.post("/logout", userAction_1.logoutUser);
exports.default = userRouter;
