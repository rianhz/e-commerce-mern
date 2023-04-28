import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { Users } from "../models/userModel";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../middleware/verifyToken";

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { username, password, confirmPassword, role, email } = req.body;

		const usernameDuplicated = await Users.findOne({ username });
		const emailDuplicated = await Users.findOne({ email });

		if (username === "" || password === "" || role === "" || email === "")
			return res.status(400).json({ message: `All fields can't be empty!` });

		if (username.length <= 3)
			return res
				.status(400)
				.json({ message: "Username should more than 3 character!" });

		if (usernameDuplicated)
			return res.status(400).json({ message: "Username alerady exist!" });

		if (password.length <= 3)
			return res
				.status(400)
				.json({ message: "Passowrd should more than 3 character!" });

		if (password !== confirmPassword)
			return res
				.status(400)
				.json({ message: "Wrong combination password, try again!" });

		//regex email
		let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

		if (!regex.test(email))
			return res.status(400).json({ message: "Invalid Email!" });
		if (emailDuplicated)
			return res.status(400).json({ message: "Email alerady exist" });

		const hashed = await bcrypt.hash(password, 10);

		await Users.create({
			username,
			password: hashed,
			role,
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

		if (!user) return res.status(400).json({ message: "User not found" });

		const match = await bcrypt.compare(password, userPassword);
		if (!match) return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign(
			{
				id: user?._id.toString(),
				username: user?.username,
				email: user?.email,
				role: user?.role,
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
			expires: new Date(Date.now() + 600000), //115000000
			sameSite: "lax",
			httpOnly: true,
		});

		return res.status(200).send({ message: "Login success" });
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

export const getProfile = async (req: Request, res: Response) => {
	let username = (req as IGetUserAuthInfoRequest).username;

	try {
		const user = await Users.findOne({ username }, "-password");
		return res.json(user);
	} catch (error: any) {
		return res.status(404).json(error);
	}
};

export const logoutUser = async (req: Request, res: Response) => {
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
				return res.status(403).json({ message: "Authentication failed" });
			}

			res.clearCookie(`${user.username}`);
			req.cookies[`${user.username}`] = "";
			return res.status(200).json({ message: "Successfully Logged Out" });
		}
	);
};
