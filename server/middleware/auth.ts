import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Users } from "../models/userModel";

export interface IGetUserAuthInfoRequest extends Request {
	username: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization;
		res.json(token);
		next();
	} catch (error) {
		console.log(error);
	}

	// const cookies = req.headers.cookie;
	// const prevToken = cookies?.split("=")[1];

	// if (!prevToken) {
	// 	return res.status(400).json({ message: "Couldn't find token" });
	// }
	// jwt.verify(
	// 	prevToken as string,
	// 	process.env.SECRET_KEY as string,
	// 	(err: any, user: any) => {
	// 		if (err) {
	// 			return res.status(403).json({ message: "Authentication failed" });
	// 		}
	// 		res.clearCookie(`${user.id}`);
	// 		req.cookies[`${user.id}`] = "";

	// 		const token = jwt.sign(
	// 			{
	// 				id: user.id.toString(),
	// 			},
	// 			process.env.SECRET_KEY as string,
	// 			{
	// 				expiresIn: "35s",
	// 			}
	// 		);

	// 		res.cookie(user.id, token, {
	// 			httpOnly: true,
	// 			expires: new Date(Date.now() + 1000 * 30),
	// 			sameSite: "lax",
	// 		});

	// 		(req as IGetUserAuthInfoRequest).id = user.id;
	// 		next();
	// 	}
	// );
};
