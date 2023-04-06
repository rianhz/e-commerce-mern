import * as dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { Users } from "../models/userModel";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../middleware/auth";

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { username, password, isAdmin, email } = req.body;

		const usernameDuplicated = await Users.findOne({ username });
		const emailDuplicated = await Users.findOne({ email });

		if (username === "" || password === "" || isAdmin === "" || email === "")
			return res.status(400).json({ error: `All fields can't be empty` });

		if (usernameDuplicated)
			return res.status(400).json({ error: "Username alerady exist" });

		if (emailDuplicated)
			return res.status(400).json({ error: "Email alerady exist" });

		const hashed = await bcrypt.hash(password, 10);

		await Users.create({
			username,
			password: hashed,
			isAdmin,
			email,
		});

		return res.status(201).json({
			message: "User has been created!",
		});
	} catch (err) {
		if (err) {
			return res.status(400).json({ error: err });
		}
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const user = await Users.findOne({ username });
		const userPassword = user?.password as string;

		if (!user) return res.status(400).json({ message: "Username not found" });

		const match = await bcrypt.compare(password, userPassword);
		if (!match) return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign(
			{
				id: user?._id.toString(),
				username: user?.username,
				email: user?.email,
				isAdmin: user?.isAdmin,
			},
			process.env.SECRET_KEY as string,
			{
				expiresIn: "1d",
			}
		);

		if (req.cookies[`${user.username}`]) {
			req.cookies[`${user.username}`] = "";
		}

		res.cookie(String(user.username), token, {
			path: "/",
			expires: new Date(Date.now() + 10000 * 24),
			httpOnly: true,
			sameSite: "lax",
		});

		return res.status(200).send(user);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

export const getProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let username = (req as IGetUserAuthInfoRequest).username;

	try {
		const user = await Users.findOne({ username }, "-password");
		return res.json(user);
	} catch (error: any) {
		return res.status(404).json(error);
	}
};

// export const refreshToken = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const cookies = req.headers.cookie;
// 	console.log(cookies);

// 	const token = cookies?.split("=")[1];

// 	try {
// 		if (!token) {
// 			return res.status(400).json("Cant find Token !");
// 		}

// 		jwt.verify(
// 			String(token),
// 			process.env.SECRET_KEY as string,
// 			(err: any, user: any) => {
// 				if (err) {
// 					console.log(err);
// 				}

// 				res.clearCookie(`${user.username}`);
// 				req.cookies[`${user.username}`] = "";

// 				const tokenref = jwt.sign(
// 					{
// 						id: user?._id.toString(),
// 						username: user?.username,
// 						email: user?.email,
// 						isAdmin: user?.isAdmin,
// 					},
// 					process.env.SECRET_KEY as string,
// 					{
// 						expiresIn: "35s",
// 					}
// 				);
// 				console.log("regenr");

// 				res.cookie(String(user.username), tokenref, {
// 					path: "/",
// 					expires: new Date(Date.now() + 1000 * 30),
// 					httpOnly: true,
// 					sameSite: "lax",
// 				});

// 				(req as IGetUserAuthInfoRequest).username = user.username;
// 			}
// 		);
// 		next();
// 	} catch (error) {
// 		if (error)
// 			return res.status(400).json({ error: "Invalid adadadadsssssssssss" });
// 	}
// };

export const logoutUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookies = req.headers.cookie;
	const prevToken = cookies?.split("=")[1];
	if (!prevToken) {
		return res.status(400).json({ message: "Couldn't find token" });
	}
	jwt.verify(
		String(prevToken),
		process.env.SECRET_KEY as string,
		(err: any, user: any) => {
			if (err) {
				console.log(err);
				return res.status(403).json({ message: "Authentication failed" });
			}

			res.clearCookie(`${user.username}`);
			req.cookies[`${user.username}`] = "";
			return res.status(200).json({ message: "Successfully Logged Out" });
		}
	);
};
