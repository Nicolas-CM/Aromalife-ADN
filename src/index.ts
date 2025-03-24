//let express = require("express");
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { db } from "./lib/connectionDB";

dotenv.config();

export const app: Express = express();
const port: number = (process.env.PORT as any) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/error", (req: Request, res: Response) => {
  res.status(500).send("Error");
});

app.get("/notfound", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});
db.then(() =>
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
);
