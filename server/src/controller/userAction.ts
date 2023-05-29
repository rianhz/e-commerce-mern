import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { Users } from "../models/userModel";
import { generateToken } from "../helper/generateToken";

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
		const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

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
			status: "201",
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

		const token = generateToken(user);

		return res.status(200).send({
			status: "200",
			name: user.username,
			token: token,
		});
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await Users.find();
		return res.status(200).json({ status: "200", data: users });
	} catch (error: any) {
		return res.status(404).json(error);
	}
};

export const logoutUser = async (req: Request, res: Response) => {
	const bearer = req.headers.authorization;
	const prevToken = bearer?.split(" ")[1];

	if (prevToken === "" || prevToken === undefined)
		return res
			.status(400)
			.json({ status: "400", message: "Couldn't find token" });

	return res
		.status(200)
		.json({ status: "200", message: "Successfully Logged Out" });
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await Users.findOneAndDelete({ _id: id });
		return res.status(200).json({ status: "200", message: "User deleted!" });
	} catch (error) {
		return res
			.status(500)
			.json({ status: "500", message: "Internal server error" });
	}
};
