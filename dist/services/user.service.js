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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// Import necessary modules and types
const models_1 = require("../models");
const exceptions_1 = require("../exceptions");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define the UserService class
class UserService {
    // Method to create a new user
    create(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a user with the given email already exists
                const userExists = yield this.findByEmail(userInput.email);
                if (userExists != null) {
                    // Throw an error if the user already exists
                    throw new ReferenceError("User already exists");
                }
                // Hash the user's password if provided
                if (userInput.password)
                    userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
                // Create and return the new user
                const user = yield models_1.UserModel.create(userInput);
                return user;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to find a user by their email
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Search for the user in the database
                const user = yield models_1.UserModel.findOne({ email });
                return user;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to retrieve all users
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users from the database
                const users = yield models_1.UserModel.find();
                return users;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to find a user by their ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Search for the user by ID in the database
                const user = yield models_1.UserModel.findById(id);
                return user;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to update a user's information
    update(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find and update the user by ID
                const user = yield models_1.UserModel.findOneAndUpdate({ _id: id }, userInput, { returnOriginal: false });
                // Clear the password field in the returned user object
                if (user)
                    user.password = "";
                return user;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to delete a user by their ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find and delete the user by ID
                const user = yield models_1.UserModel.findByIdAndDelete(id);
                return user;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to handle user login
    login(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a user with the given email exists
                const userExists = yield this.findByEmail(userLogin.email);
                if (userExists === null) {
                    // Throw an error if the user does not exist
                    throw new exceptions_1.AuthError("User or password incorrect");
                }
                // Compare the provided password with the stored hashed password
                const isMatch = yield bcrypt_1.default.compare(userLogin.password, userExists.password);
                if (!isMatch) {
                    // Throw an error if the passwords do not match
                    throw new exceptions_1.AuthError("User or password incorrect");
                    console.log("No hacen match");
                }
                // Return the user information and a generated token
                return {
                    user: {
                        id: userExists.id,
                        name: userExists.name,
                        email: userExists.email,
                        roles: userExists.roles,
                        token: this.generateToken(userExists),
                        age: userExists.age,
                    },
                };
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to generate a JWT token for a user
    generateToken(user) {
        try {
            // Sign and return the JWT token
            return jsonwebtoken_1.default.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    roles: user.roles,
                },
            }, process.env.JWT_SECRET || "secret", { expiresIn: "10m" });
        }
        catch (error) {
            // Rethrow any errors encountered
            throw error;
        }
    }
}
// Export an instance of the UserService class
exports.userService = new UserService();
