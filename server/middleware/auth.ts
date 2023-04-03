import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface IGetUserAuthInfoRequest extends Request {
	id: string;
}

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookies = req.headers.cookie;
	const token = cookies?.split("=")[1];
	console.log(token);

	if (!token) {
		return res.status(404).json({ message: "No token" });
	}
	jwt.verify(
		token as string,
		process.env.SECRET_KEY as string,
		(err: any, user: any) => {
			if (err) {
				return res.status(400).json({ message: "Invalid token" });
			}
			(req as IGetUserAuthInfoRequest).id = user.id;
		}
	);
	next();
};
