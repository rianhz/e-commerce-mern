import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import productRouter from "./routers/Products/productsRouter";
import path from "path";
import cookieParser from "cookie-parser";
import { db } from "./config/db";
import userRouter from "./routers/Users/userRouter";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "https://e-commerce-fe-five.vercel.app",
		credentials: true,
		allowedHeaders: "*",
	})
);
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/products", productRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
	res.json("Ready!");
});

app.listen(5000, (): void => {
	console.log("Server Running");
});

db.on("error", (err) => {
	console.log(err);
});

db.once("open", () => {
	console.log("MongoDB ready!");
});
