import { Request, Response } from "express";
import { Product } from "../models/productModel";

export const getProduct = async (req: Request, res: Response) => {
	const product = await Product.find();
	res.json(product);
};

export const addProduct = async (req: Request, res: Response) => {
	const { product_name, product_price, product_made, category, desc } =
		req.body;

	try {
		if (!product_price || !product_name || !product_made || !desc) {
			return res.status(400).json({ message: "All data is required" });
		}

		if (!req.file) {
			return res.status(422).json("Image file is required");
		}

		const product_image = req.file?.path;

		const product = await Product.create({
			product_name,
			product_price,
			product_image,
			product_made,
			category,
			desc,
		});

		res.json(product);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const getProductLowPrice = async (req: Request, res: Response) => {
	const products = await Product.find({ product_price: { $lt: 50000 } });

	res.json(products);
};
export const getProductExpensivePrice = async (req: Request, res: Response) => {
	const products = await Product.find({ product_price: { $gt: 50000 } });

	res.json(products);
};
export const getProductMale = async (req: Request, res: Response) => {
	const products = await Product.find({ category: "male" });

	res.json(products);
};

export const getProductFemale = async (req: Request, res: Response) => {
	const products = await Product.find({ category: "female" });

	res.json(products);
};

export const getProductJewelery = async (req: Request, res: Response) => {
	const products = await Product.find({ category: "jewelery" });

	res.json(products);
};

export const sortASC = async (req: Request, res: Response) => {
	const products = await Product.find().sort({ product_name: "asc" });

	res.json(products);
};
export const sortDESC = async (req: Request, res: Response) => {
	const products = await Product.find().sort({ product_name: "desc" });

	res.json(products);
};
