// Importing the mongoose library for MongoDB connection
import mongoose from "mongoose";
// Importing dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Loading environment variables
dotenv.config();

// Defining the connection string for MongoDB
// It uses the MONGO_URL environment variable or defaults to a local MongoDB instance
const connectionString =
  process.env.MONGO_URL || "mongodb://localhost:27017/nodejs";

// Establishing a connection to the MongoDB database
export const db = mongoose
  .connect(connectionString) // Connecting to the database using the connection string
  .then(() => console.log("Connected to MongoDB")) // Logging a success message if the connection is successful
  .catch((err) => console.log(err)); // Logging an error message if the connection fails