import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			unique: false,
		},
		email: {
			type: String,
			unique: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Users = mongoose.model("Users", UserSchema);
