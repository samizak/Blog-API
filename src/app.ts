import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { blogsRouter } from "./routes/blog";

dotenv.config();

// Check if MONGO_URL is in .env file
if (process.env.MONGO_URL == null) {
  throw new Error("MONGO_URL not specified in .env file!");
}

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB();

// middleware
app.use(cors()); // enable cors
app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body

// routes
app.use("/api/v1/", blogsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
