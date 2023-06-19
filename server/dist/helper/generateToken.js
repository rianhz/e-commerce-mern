"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const token = jsonwebtoken_1.default.sign({
        id: user === null || user === void 0 ? void 0 : user._id,
        username: user === null || user === void 0 ? void 0 : user.username,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    }, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map