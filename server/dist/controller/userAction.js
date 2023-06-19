"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.logoutUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const bcrypt = __importStar(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const generateToken_1 = require("../helper/generateToken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, confirmPassword, role, email } = req.body;
        const usernameDuplicated = yield userModel_1.Users.findOne({ username });
        const emailDuplicated = yield userModel_1.Users.findOne({ email });
        if (username === "" || password === "" || role === "" || email === "")
            return res.status(400).json({ message: `All fields can't be empty!` });
        if (username.length <= 3)
            return res
                .status(400)
                .json({ message: "Username should more than 3 character!" });
        if (usernameDuplicated)
            return res.status(400).json({ message: "Username alerady exist!" });
        if (password.length <= 3)
            return res
                .status(400)
                .json({ message: "Passowrd should more than 3 character!" });
        if (password !== confirmPassword)
            return res
                .status(400)
                .json({ message: "Wrong combination password, try again!" });
        //regex email
        const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        if (!regex.test(email))
            return res.status(400).json({ message: "Invalid Email!" });
        if (emailDuplicated)
            return res.status(400).json({ message: "Email alerady exist" });
        const hashed = yield bcrypt.hash(password, 10);
        yield userModel_1.Users.create({
            username,
            password: hashed,
            role,
            email,
        });
        return res.status(201).json({
            status: "201",
            message: "User has been created!",
        });
    }
    catch (err) {
        if (err) {
            return res.status(400).json({ error: err });
        }
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield userModel_1.Users.findOne({ username });
        const userPassword = user === null || user === void 0 ? void 0 : user.password;
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const match = yield bcrypt.compare(password, userPassword);
        if (!match)
            return res.status(400).json({ message: "Invalid password" });
        const token = (0, generateToken_1.generateToken)(user);
        return res.status(200).send({
            status: "200",
            name: user.username,
            token: token,
        });
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.Users.find();
        return res.status(200).json({ status: "200", data: users });
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer = req.headers.authorization;
    const prevToken = bearer === null || bearer === void 0 ? void 0 : bearer.split(" ")[1];
    if (prevToken === "" || prevToken === undefined)
        return res
            .status(400)
            .json({ status: "400", message: "Couldn't find token" });
    return res
        .status(200)
        .json({ status: "200", message: "Successfully Logged Out" });
});
exports.logoutUser = logoutUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield userModel_1.Users.findOneAndDelete({ _id: id });
        return res.status(200).json({ status: "200", message: "User deleted!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ status: "500", message: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userAction.js.map