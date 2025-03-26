"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Importing necessary modules and types from express
const express_1 = __importDefault(require("express"));
// Importing dotenv to load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// Importing routes from the routes file
const routes_1 = __importDefault(require("./routes"));
// Importing the database connection
const connectionDB_1 = require("./lib/connectionDB");
// Loading environment variables from the .env file
dotenv_1.default.config();
// Creating an instance of the Express application
exports.app = (0, express_1.default)();
// Defining the port to be used by the server, defaulting to 3000 if not provided
const port = process.env.PORT || 3000;
// Adding middleware to parse JSON request bodies
exports.app.use(express_1.default.json());
// Adding middleware to parse URL-encoded request bodies
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Setting up the main route to use the imported routes
exports.app.use("/", routes_1.default);
// Defining a route to respond with "Hello World" for GET requests to "/"
exports.app.get("/", (req, res) => {
    res.send("Hello World");
});
// Defining a route to simulate an error with a 500 status code
exports.app.get("/error", (req, res) => {
    res.status(500).send("Error");
});
// Defining a route to simulate a "Not Found" response with a 404 status code
exports.app.get("/notfound", (req, res) => {
    res.status(404).send("Not Found");
});
// Starting the server once the database connection is established
connectionDB_1.db.then(() => exports.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}));
