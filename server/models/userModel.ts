import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			select: true,
		},
		isAdmin: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

export const Users = mongoose.model("Users", UserSchema);
