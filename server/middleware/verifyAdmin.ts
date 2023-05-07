import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../user";

export const verifySuperAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookie = req.headers.cookie;
	const token = cookie?.split("=")[1];

	try {
		jwt.verify(String(token), process.env.SECRET_KEY as string, (err, user) => {
			if (err)
				return res.status(400).json({ message: "User not found as seller" });

			const role = (user as IUser).role;

			if (role === "buyer" || role === "admin")
				return res
					.status(400)
					.json({ message: "This account not authorize to delete any user" });

			next();
		});
	} catch (error) {
		return res.json(error);
	}
};

export const verifyAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookie = req.headers.cookie;
	const token = cookie?.split("=")[1];

	try {
		jwt.verify(String(token), process.env.SECRET_KEY as string, (err, user) => {
			if (err)
				return res.status(400).json({ message: "User not found as seller" });

			const role = (user as IUser).role;

			if (role === "buyer")
				return res
					.status(400)
					.json({ message: "This account not authorize to add any product" });

			next();
		});
	} catch (error) {
		return res.json(error);
	}
};
