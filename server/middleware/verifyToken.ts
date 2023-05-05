import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends Request {
	username: string;
}

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookies = req.headers.cookie;
	const token = cookies?.split("=")[1];

	try {
		if (!token) {
			return res.status(400).json("No Token !");
		}

		jwt.verify(
			String(token),
			process.env.SECRET_KEY as string,
			(err: any, user: any) => {
				if (err) {
					console.log(err);
				}
				(req as IGetUserAuthInfoRequest).username = user.username;
			}
		);
		next();
	} catch (error) {
		if (error) return res.status(400).json({ error: "Invalid" });
	}
};
