"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifySuperAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifySuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        jsonwebtoken_1.default.verify(String(token), process.env.SECRET_KEY, (err, user) => {
            if (err)
                return res.status(400).json({ message: err.message });
            const role = user.role;
            if (role === "buyer" || role === "seller")
                return res.status(400).json({
                    status: "400",
                    message: "Unauthorize",
                });
            next();
        });
    }
    catch (error) {
        return res.json(error);
    }
});
exports.verifySuperAdmin = verifySuperAdmin;
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    try {
        jsonwebtoken_1.default.verify(String(token), process.env.SECRET_KEY, (err, user) => {
            if (err)
                return res.status(400).json({ message: err });
            const role = user.role;
            if (role === "buyer")
                return res
                    .status(400)
                    .json({ message: "This account not authorize to add any product" });
            next();
        });
    }
    catch (error) {
        return res.json(error);
    }
});
exports.verifyAdmin = verifyAdmin;
