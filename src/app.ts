import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// Check if MONGO_URL is in .env file
if (process.env.MONGO_URL == null) {
  throw new Error("MONGO_URL not specified in .env file!");
}

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
