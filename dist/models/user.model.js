"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
// Importing mongoose library for MongoDB schema and model creation
const mongoose_1 = __importDefault(require("mongoose"));
// Defining the schema for the user
const userSchema = new mongoose_1.default.Schema({
    // Property for the name of the user, required
    name: { type: String, required: true },
    // Property for the email of the user, required, indexed, and must be unique
    email: { type: String, required: true, index: true, unique: true },
    // Property for the password of the user, required
    password: { type: String, required: true },
    // Property for the age of the user, required
    age: { type: Number, required: true },
    // Property for the roles of the user, must be an array of predefined values
    roles: { type: [String], enum: ["client", "superadmin", "manager"] },
}, 
// Schema options to include timestamps and specify the collection name
{ timestamps: true, collection: "users" });
// Creating the User model using the schema
exports.UserModel = mongoose_1.default.model("User", // Name of the model
userSchema // Schema used for the model
);
