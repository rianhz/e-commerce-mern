import express, { Request } from "express";
import {
	addProduct,
	getProduct,
	getProductExpensivePrice,
	getProductFemale,
	getProductInput,
	getProductJewelery,
	getProductLowPrice,
	getProductMale,
	searchByQuery,
	sortASC,
	sortDESC,
	getProductById,
	editProduct,
	deleteProduct,
} from "../../controller/productsActions";
import multer, { FileFilterCallback } from "multer";
import { verifyAdmin } from "../../middleware/verifyAdmin";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: DestinationCallback
	): void => {
		cb(null, "images");
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		cb: FileNameCallback
	): void => {
		cb(null, new Date().getTime() + "-" + file.originalname);
	},
});

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const productRouter = express.Router();

productRouter.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single(
		"product_image"
	)
);
productRouter.get("/", getProduct);
productRouter.get("/:id", getProductById);
productRouter.post("/search/query", searchByQuery);
productRouter.patch("/edit/:id", verifyAdmin, editProduct);
productRouter.delete("/delete/:id", verifyAdmin, deleteProduct);
productRouter.post("/", verifyAdmin, addProduct);
productRouter.get("/filter-by/low-price", getProductLowPrice);
productRouter.get("/filter-by/expensive-price", getProductExpensivePrice);
productRouter.get("/filter-by/female", getProductFemale);
productRouter.get("/filter-by/male", getProductMale);
productRouter.get("/filter-by/jewelery", getProductJewelery);
productRouter.get("/sort-by/asc", sortASC);
productRouter.get("/sort-by/desc", sortDESC);
productRouter.post("/search-product", getProductInput);

export default productRouter;
