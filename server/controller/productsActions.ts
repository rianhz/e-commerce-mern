import { Request, Response } from "express";

import { Product } from "../models/productModel";

export const getProduct = async (req: Request, res: Response) => {
	const product = await Product.find();
	res.json(product);
};

export const addProduct = async (req: Request, res: Response) => {
	const { product_name, product_price, product_made, desc } = req.body;

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
			desc,
		});

		res.json(product);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
