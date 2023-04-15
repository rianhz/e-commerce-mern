import { Request, Response } from "express";
import { Product } from "../models/productModel";

export const getProduct = async (req: Request, res: Response) => {
	const product = await Product.find();
	res.json(product);
};

export const getProductById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const product = await Product.find({ _id: id });
	res.json(product);
};
export const editProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { product_name, product_price, product_made, category, desc } =
		req.body;

	const product_image = req.file?.path;

	await Product.findOneAndUpdate(
		{ _id: id },
		{
			product_name,
			product_price,
			product_made,
			category,
			desc,
			product_image,
		}
	);
	res.json("Product edited!");
};

export const addProduct = async (req: Request, res: Response) => {
	const { product_name, product_price, product_made, category, desc } =
		req.body;

	try {
		if (!product_price || !product_name || !product_made || !desc) {
			return res.status(400).json({ message: "All data is required" });
		}

		if (!req.file) {
			return res.status(422).json({ message: "Image file is required" });
		}

		const product_image = req.file?.path;

		await Product.create({
			product_name,
			product_price,
			product_image,
			product_made,
			category,
			desc,
		});

		res.json({ message: "Product added!" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await Product.findOneAndDelete({ _id: id });
		return res.status(200).json({ message: "Product deleted!" });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getProductLowPrice = async (req: Request, res: Response) => {
	const products = await Product.find({ product_price: { $lt: 50000 } });

	res.json(products);
};

export const searchByQuery = async (req: Request, res: Response) => {
	const { category, price } = req.query;

	try {
		if (
			(price == undefined || price === "") &&
			(category == undefined || category === "")
		) {
			const products = await Product.find();

			return res.status(200).json(products);
		}

		if ((price == undefined || price === "") && category !== undefined) {
			const products = await Product.find({
				category: category,
			});

			return res.status(200).json(products);
		}

		if ((category == undefined || category === "") && price !== undefined) {
			const products = await Product.find({
				product_price: price === "low" ? { $lt: 100000 } : { $gt: 100001 },
			});

			return res.status(200).json(products);
		}

		const products = await Product.find({
			product_price: price === "low" ? { $lt: 50000 } : { $gt: 50000 },
			category: category,
		});

		return res.status(200).json(products);
	} catch (error) {
		return res.json(error);
	}
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

export const getProductInput = async (req: Request, res: Response) => {
	const { product_names } = req.query;

	const product = await Product.find({
		product_name: new RegExp(`${product_names}`, "i"),
	});

	return res.json(product);
};
