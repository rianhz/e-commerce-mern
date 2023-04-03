import * as dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { Users } from "../models/userModel";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../middleware/auth";

export const getProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user_id = (req as IGetUserAuthInfoRequest).id;

	try {
		const user = await Users.findById(user_id, "-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error: any) {
		res.json(new Error(error));
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const { username, password, isAdmin } = req.body;

	try {
		const userDuplicated = await Users.findOne({ username });

		if (userDuplicated)
			return res.status(400).json({ message: "Username alerady exist" });

		const hashed = await bcrypt.hash(password, 10);
		await Users.create({
			username,
			password: hashed,
			isAdmin,
		});

		res.status(201).json({ message: "User has been created" });
	} catch (err) {
		if (err) {
			return res.status(400).json({ message: err });
		}
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await Users.findOne({ username: username });
		const userPassword = user?.password as string;

		if (!user) return res.status(400).json({ message: "Username not found" });

		bcrypt.compare(password, userPassword).then((match) => {
			if (!match) {
				res.status(400).json({ message: "Invalid password" });
			} else {
				const token = jwt.sign(
					{
						id: user._id.toString(),
						username: user.username,
						isAdmin: user.isAdmin,
					},
					process.env.SECRET_KEY as string,
					{
						expiresIn: "35s",
					}
				);

				if (req.cookies[`${user.id}`]) {
					req.cookies[`${user.id}`] = "";
				}
				res
					.cookie(user.id, token, {
						httpOnly: true,
						expires: new Date(Date.now() + 1000 * 30),
						sameSite: "lax",
					})
					.json({ message: "Logged in", user: user, token });
			}
		});
	} catch (error: any) {
		res.status(400).json(error);
	}
};

export const logoutUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookies = req.headers.cookie;
	const prevToken = cookies?.split("=")[1];
	console.log(cookies);

	if (!prevToken) {
		return res.status(400).json({ message: "Couldn't find token" });
	}
	jwt.verify(
		prevToken as string,
		process.env.SECRET_KEY as string,
		(err: any, user: any) => {
			if (err) {
				return res.status(403).json({ message: "Authentication failed" });
			}

			res.clearCookie(`${user.id}`);
			req.cookies[`${user.id}`] = "";

			return res.status(200).json("Logout success");
		}
	);
};
