import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "",
	user: {
		email: "",
		exp: 0,
		iat: 0,
		id: "",
		role: "",
		username: "",
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addToken: (state, action) => {
			state.token = action.payload;
		},
		addUser: (state, action) => {
			state.user = { ...state.user, ...action.payload };
		},
		logoutUser: (state) => {
			return (state = { ...state, ...initialState });
		},
	},
});

export const { addToken, addUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
