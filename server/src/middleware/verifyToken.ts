import { NextFunction, Request, Response } from "express";

export interface IGetUserAuthInfoRequest extends Request {
	username: string;
}

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearer = req.headers.authorization?.split(" ")[1];

	if (bearer === undefined) return res.json({ message: "No Token!" });

	next();
};
