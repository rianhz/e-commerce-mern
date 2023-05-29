import { NextFunction, Request, Response } from "express";

export const corsConfig = (req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.header(`Access-Control-Allow-Origin`, `example.com`);
	res.header(`Access-Control-Allow-Methods`, `GET,PATCH,POST,DELETE`);
	next();
};
