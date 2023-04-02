import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface IGetUserAuthInfoRequest extends Request {
	user: {
		id: string;
		isAdmin: boolean;
		iat: number;
		exp: number;
	};
}

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.access_token;
	if (!token) {
		res.status(401).json("Not authenticated");
		next();
	}

	jwt.verify(token, process.env.SECRET_KEY as string, (err: any, user: any) => {
		console.log(user);

		if (err) return res.status(403).json("Invalid token");
		(req as IGetUserAuthInfoRequest).user = user;
		next();
	});
};
