import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

export const verifySuperAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];

	try {
		jwt.verify(String(token), process.env.SECRET_KEY as string, (err, user) => {
			if (err) return res.status(400).json({ message: err.message });

			const role = (user as IUser).role;

			if (role === "buyer" || role === "seller")
				return res.status(400).json({
					status: "400",
					message: "Unauthorize",
				});

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
	const token = req.headers.authorization?.split(" ")[1];

	try {
		jwt.verify(String(token), process.env.SECRET_KEY as string, (err, user) => {
			if (err) return res.status(400).json({ message: err });

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
