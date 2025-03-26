"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// Importing the mongoose library for MongoDB connection
const mongoose_1 = __importDefault(require("mongoose"));
// Importing dotenv to load environment variables from a .env file
const dotenv_1 = __importDefault(require("dotenv"));
// Loading environment variables
dotenv_1.default.config();
// Defining the connection string for MongoDB
// It uses the MONGO_URL environment variable or defaults to a local MongoDB instance
const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/nodejs";
// Establishing a connection to the MongoDB database
exports.db = mongoose_1.default
    .connect(connectionString) // Connecting to the database using the connection string
    .then(() => console.log("Connected to MongoDB")) // Logging a success message if the connection is successful
    .catch((err) => console.log(err)); // Logging an error message if the connection fails
