// Importing necessary modules and types from express
import express, { Express, Request, Response } from "express";

// Importing dotenv to load environment variables
import dotenv from "dotenv";

// Importing routes from the routes file
import routes from "./routes";

// Importing the database connection
import { db } from "./lib/connectionDB";

// Loading environment variables from the .env file
dotenv.config();

// Creating an instance of the Express application
export const app: Express = express();

// Defining the port to be used by the server, defaulting to 3000 if not provided
const port: number = (process.env.PORT as any) || 3000;

// Adding middleware to parse JSON request bodies
app.use(express.json());

// Adding middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Setting up the main route to use the imported routes
app.use("/", routes);

// Defining a route to respond with "Hello World" for GET requests to "/"
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Defining a route to simulate an error with a 500 status code
app.get("/error", (req: Request, res: Response) => {
  res.status(500).send("Error");
});

// Defining a route to simulate a "Not Found" response with a 404 status code
app.get("/notfound", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

// Starting the server once the database connection is established
db.then(() =>
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
);
