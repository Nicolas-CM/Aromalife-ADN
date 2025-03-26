"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services"); // User service for handling business logic
const exceptions_1 = require("../exceptions"); // Custom exception for authentication errors
// Defining the UserController class to handle user-related operations
class Usercontroller {
    // Method to create a new user
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Creating a new user using the service and request body
                const newUser = yield services_1.userService.create(req.body);
                // Sending a 201 status with the created user as a response
                res.status(201).json(newUser);
            }
            catch (error) {
                // Handling specific error when the user already exists
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "User already exists" });
                    return;
                }
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve a specific user by their ID
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id; // Extracting the ID from the request parameters
                const user = yield services_1.userService.findById(id); // Finding the user by ID
                if (user === null) {
                    // If the user is not found, return a 404 status with an error message
                    res.status(404).json({ message: `User with id ${id} not found` });
                    return;
                }
                // Sending the found user as a response
                res.json(user);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve all users
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield services_1.userService.findAll(); // Fetching all users
                // Sending the list of users as a response
                res.json(users);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to update an existing user by their ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id; // Extracting the ID from the request parameters
                const user = yield services_1.userService.update(id, req.body // Updating the user with the provided data
                );
                if (user === null) {
                    // If the user is not found, return a 404 status with an error message
                    res.status(404).json({ message: `User with id ${id} not found` });
                    return;
                }
                // Sending the updated user as a response
                res.json(user);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to delete a user by their ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id; // Extracting the ID from the request parameters
                console.log(id); // Logging the ID for debugging purposes
                const user = yield services_1.userService.delete(id); // Deleting the user by ID
                if (user === null) {
                    // If the user is not found, return a 404 status with an error message
                    res.status(404).json({ message: `User with id ${id} not found` });
                    return;
                }
                // Sending the deleted user as a response
                res.json(user);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to handle user login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resObj = yield services_1.userService.login(req.body); // Authenticating the user
                // Sending a 200 status with the authentication result as a response
                res.status(200).json(resObj);
            }
            catch (error) {
                // Handling authentication errors
                if (error instanceof exceptions_1.AuthError) {
                    res.status(401).json({ message: error.message }); // Sending a 401 status for unauthorized access
                    return;
                }
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
}
// Exporting an instance of the UserController class for use in other parts of the application
exports.userController = new Usercontroller();
