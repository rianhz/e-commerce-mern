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
exports.getProductInput = exports.sortDESC = exports.sortASC = exports.getProductJewelery = exports.getProductFemale = exports.getProductMale = exports.getProductExpensivePrice = exports.searchByQuery = exports.getProductLowPrice = exports.deleteProduct = exports.addProduct = exports.editProduct = exports.getProductById = exports.getProductPagination = exports.getProduct = void 0;
const productModel_1 = require("../models/productModel");
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.Product.find();
    return res.status(200).json({ status: "200", data: product });
});
exports.getProduct = getProduct;
const getProductPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalData;
    yield productModel_1.Product.find()
        .countDocuments()
        .then((counter) => {
        totalData = counter;
        productModel_1.Product.find()
            .skip((parseInt(page) - 1) * parseInt(perPage))
            .limit(parseInt(perPage))
            .then((data) => res.json(data));
    })
        .catch((err) => console.log(err));
});
exports.getProductPagination = getProductPagination;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield productModel_1.Product.find({ _id: id });
    res.status(200).json({ status: "200", data: product });
});
exports.getProductById = getProductById;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { product_name, product_price, product_made, category, desc } = req.body;
    const product_image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    cloudinary.config({
        cloud_name: "dib36cwwr",
        api_key: "242859779424657",
        api_secret: "uNRQyN9p2FsT6ZdFvtpyaYGpV2c",
    });
    const resCloud = yield cloudinary.uploader.upload(product_image);
    const url = cloudinary.url(resCloud.public_id);
    yield productModel_1.Product.findOneAndUpdate({ _id: id }, {
        product_name,
        product_price,
        product_made,
        category,
        desc,
        product_image: url,
    });
    res.status(200).json({
        status: "200",
        message: "Product edited!",
    });
});
exports.editProduct = editProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { product_name, product_price, product_made, category, desc } = req.body;
    const product_image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
    try {
        if (!product_price || !product_name || !product_made || !desc) {
            return res
                .status(400)
                .json({ status: "400", message: "All data is required" });
        }
        if (!req.file) {
            return res
                .status(422)
                .json({ status: "400", message: "Image file is required" });
        }
        cloudinary.config({
            cloud_name: "dib36cwwr",
            api_key: "242859779424657",
            api_secret: "uNRQyN9p2FsT6ZdFvtpyaYGpV2c",
        });
        const resCloud = yield cloudinary.uploader.upload(product_image);
        // Generate
        const url = cloudinary.url(resCloud.public_id);
        const product = yield productModel_1.Product.create({
            product_name,
            product_price,
            product_image: url,
            product_made,
            category,
            desc,
        });
        res
            .status(201)
            .json({ status: "201", message: "Product added!", product: product });
    }
    catch (error) {
        res.status(500).json({ status: "500", message: "Server error" });
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield productModel_1.Product.findOneAndDelete({ _id: id });
        return res.status(200).json({ status: "200", message: "Product deleted!" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ status: "500", message: "Internal server error" });
    }
});
exports.deleteProduct = deleteProduct;
const getProductLowPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find({ product_price: { $lt: 50000 } });
    res.status(200).json({ status: "200", data: products });
});
exports.getProductLowPrice = getProductLowPrice;
const searchByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, price } = req.query;
    try {
        if ((price == undefined || price === "") &&
            (category == undefined || category === "")) {
            const products = yield productModel_1.Product.find();
            return res.status(200).json({ status: "200", data: products });
        }
        if ((price == undefined || price === "") && category !== undefined) {
            const products = yield productModel_1.Product.find({
                category: category,
            });
            return res.status(200).json({ status: "200", data: products });
        }
        if ((category == undefined || category === "") && price !== undefined) {
            const products = yield productModel_1.Product.find({
                product_price: price === "low" ? { $lt: 100000 } : { $gt: 100001 },
            });
            return res.status(200).json({ status: "200", data: products });
        }
        const products = yield productModel_1.Product.find({
            product_price: price === "low" ? { $lt: 50000 } : { $gt: 50000 },
            category: category,
        });
        return res.status(200).json({ status: "200", data: products });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.searchByQuery = searchByQuery;
const getProductExpensivePrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find({ product_price: { $gt: 50000 } });
    res.status(200).json({ status: "200", data: products });
});
exports.getProductExpensivePrice = getProductExpensivePrice;
const getProductMale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find({ category: "male" });
    res.status(200).json({ status: "200", data: products });
});
exports.getProductMale = getProductMale;
const getProductFemale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find({ category: "female" });
    res.status(200).json({ status: "200", data: products });
});
exports.getProductFemale = getProductFemale;
const getProductJewelery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find({ category: "jewelery" });
    res.status(200).json({ status: "200", data: products });
});
exports.getProductJewelery = getProductJewelery;
const sortASC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find().sort({ product_name: "asc" });
    res.status(200).json({ status: "200", data: products });
});
exports.sortASC = sortASC;
const sortDESC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find().sort({ product_name: "desc" });
    res.status(200).json({ status: "200", data: products });
});
exports.sortDESC = sortDESC;
const getProductInput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_names } = req.query;
    const product = yield productModel_1.Product.find({
        product_name: new RegExp(`${product_names}`, "i"),
    });
    res.status(200).json({ status: "200", data: product });
});
exports.getProductInput = getProductInput;
