import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			unique: false,
		},
		email: {
			type: String,
			unique: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Users = mongoose.model("Users", UserSchema);
