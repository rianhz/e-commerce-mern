import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
	{
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
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
