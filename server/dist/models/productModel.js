"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_made: {
        type: String,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Product = mongoose_1.default.model("Product", ProductSchema);
//# sourceMappingURL=productModel.js.map