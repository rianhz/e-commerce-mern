import * as dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { Users } from "../models/userModel";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../middleware/auth";

export const getProfile = async (req: Request, res: Response) => {
	const user_id = (req as IGetUserAuthInfoRequest).user;

	const user = await Users.find({ _id: user_id.id });
	res.json(user[0]);
};

export const registerUser = async (req: Request, res: Response) => {
	const { username, password, isAdmin } = req.body;
	try {
		const userDuplicated = await Users.findOne({ username });

		if (userDuplicated) return res.status(400).json("username alerady exist");

		const hashed = await bcrypt.hash(password, 10);
		await Users.create({
			username,
			password: hashed,
			isAdmin,
		});

		res.status(201).json("User has been created");
	} catch (err) {
		if (err) {
			return res.status(400).json({ error: err });
		}
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const user = await Users.findOne({ username: username });

	if (!user) return res.status(400).json("Username not found");

	const dbPassword = user.password as string;

	bcrypt.compare(password, dbPassword).then((match) => {
		if (!match) {
			res.status(400).json("Invalid password");
		} else {
			const token = jwt.sign(
				{ id: user._id.toString(), isAdmin: user.isAdmin },
				process.env.SECRET_KEY as string,
				{
					expiresIn: "1d",
				}
			);

			const { username, _id, createdAt, updatedAt } = user;
			res
				.cookie("access_token", token, { httpOnly: true })
				.json({ _id, username, createdAt, updatedAt });
		}
	});
};
