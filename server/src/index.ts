import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import productRouter from "./routers/Products/productsRouter";
import path from "path";
import cookieParser from "cookie-parser";
import { db } from "./config/db";
import userRouter from "./routers/Users/userRouter";
// import swaggerUi from "swagger-ui-express";
// import fs from "fs";
// import YAML from "yaml";

const app = express();

app.use(
	cors({
		origin: [`${process.env.BASE_URL}`, `${process.env.BASE_URL_LOCAL}`],
		credentials: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders:
			"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/products", productRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
	res.json("Ready!");
});

app.listen(5000, (): void => {
	console.log("Server Running on port 5000");
});

db.on("error", (err) => {
	console.log(err);
});

db.once("open", () => {
	console.log("MongoDB ready!");
});

// const file = fs.readFileSync("./swagger.yaml", "utf8");
// const swaggerDocument = YAML.parse(file);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
