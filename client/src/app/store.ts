import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
	reducer: {
		cart: cartSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
