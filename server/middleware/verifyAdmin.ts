import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

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
			const status = (user as { isAdmin: boolean }).isAdmin;
			console.log(status);
			if (status !== true)
				return res
					.status(400)
					.json({ message: "This account not authorize to add any product" });

			next();
		});
	} catch (error) {
		return res.json(error);
	}
};
