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
	total_price: number;
}

type InitialStateType = {
	cart: ICart[];
	total_payment: number;
};

const initialState: InitialStateType = {
	cart: [],
	total_payment: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const temp = { quantity: 1, total_price: 0 };
			const tempItem = { ...action.payload, ...temp };

			const itemExist = state.cart.find((el) => el._id === tempItem._id);

			if (itemExist) {
				return;
			} else {
				tempItem.total_price = tempItem.product_price;
				state.cart.push(tempItem);
			}
		},
		addQuantity: (state, action) => {
			const itemExist = state.cart.find((el) => el._id === action.payload);

			if (itemExist) {
				itemExist.quantity += 1;
				itemExist.total_price = itemExist.product_price * itemExist.quantity;
			}
		},
		removeItem: (state, action) => {
			const { _id } = action.payload;
			const itemExist = state.cart.find((el) => el._id === _id);

			if (itemExist) {
				if (itemExist.quantity <= 1) {
					state.cart = state.cart.filter((el) => el._id !== itemExist._id);
				} else {
					itemExist.quantity -= 1;
					itemExist.total_price = itemExist.product_price * itemExist.quantity;
				}
			}
		},
		totalPayment: (state, action) => {
			state.total_payment = action.payload.reduce((acc: any, curr: any) => {
				return acc + curr.total_price;
			}, 0);
		},
	},
});

export const { addItem, removeItem, addQuantity, totalPayment } =
	cartSlice.actions;
export default cartSlice;
