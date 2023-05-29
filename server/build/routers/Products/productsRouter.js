"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsActions_1 = require("../../controller/productsActions");
const multer_1 = __importDefault(require("multer"));
const verifyAdmin_1 = require("../../middleware/verifyAdmin");
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const productRouter = express_1.default.Router();
productRouter.use((0, multer_1.default)({ storage: fileStorage, fileFilter: fileFilter }).single("product_image"));
productRouter.get("/", productsActions_1.getProduct);
productRouter.post("/", verifyAdmin_1.verifyAdmin, productsActions_1.addProduct);
productRouter.post("/list", productsActions_1.getProductPagination);
productRouter.post("/:id", productsActions_1.getProductById);
productRouter.post("/search/query", productsActions_1.searchByQuery);
productRouter.patch("/edit/:id", verifyAdmin_1.verifyAdmin, productsActions_1.editProduct);
productRouter.delete("/delete/:id", verifyAdmin_1.verifyAdmin, productsActions_1.deleteProduct);
productRouter.get("/filter-by/low-price", productsActions_1.getProductLowPrice);
productRouter.get("/filter-by/expensive-price", productsActions_1.getProductExpensivePrice);
productRouter.get("/filter-by/female", productsActions_1.getProductFemale);
productRouter.get("/filter-by/male", productsActions_1.getProductMale);
productRouter.get("/filter-by/jewelery", productsActions_1.getProductJewelery);
productRouter.get("/sort-by/asc", productsActions_1.sortASC);
productRouter.get("/sort-by/desc", productsActions_1.sortDESC);
productRouter.post("/search-product", productsActions_1.getProductInput);
exports.default = productRouter;
