import { createSlice } from "@reduxjs/toolkit";

export interface ICart {
	_id: number;
	product_name: string;
	product_price: number;
	product_made: string;
	product_image: string;
	category: string;
	desc: string;
	createdAt: Date;
	updatedAt: number;
	__v: number;
	quantity: number;
}

const initialState: ICart[] = [];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const tempItem = { ...action.payload, quantity: 1 };
			state.push(tempItem);
		},
	},
});

export const { addItem } = cartSlice.actions;
export default cartSlice;
