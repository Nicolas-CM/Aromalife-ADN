"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerModel = void 0;
// Importing mongoose library for MongoDB schema and model creation
const mongoose_1 = __importDefault(require("mongoose"));
// Defining the schema for the container
const containerSchema = new mongoose_1.default.Schema({
    // Property for the name of the container, required, must be unique, and have a minimum length of 3
    name: { type: String, required: true, minlength: 3, unique: true },
    // Property for the description of the container, optional with a default value of an empty string
    description: { type: String, default: "" },
    // Property for the image URL of the container, required
    imageUrl: { type: String, required: true },
    // Property for the price of the container, required and must be a non-negative number
    price: { type: Number, required: true, min: 0 },
    // Property for the height of the container, required and must be a non-negative number
    height: { type: Number, required: true, min: 0 },
    // Property for the width of the container, required and must be a non-negative number
    width: { type: Number, required: true, min: 0 },
    // Property for the diameter of the container, optional and must be a non-negative number
    diameter: { type: Number, required: false, min: 0 },
}, 
// Schema options to include timestamps and specify the collection name
{ timestamps: true, collection: "containers" });
// Creating the Container model using the schema
exports.ContainerModel = mongoose_1.default.model("Container", // Name of the model
containerSchema // Schema used for the model
);
