"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerSchema = void 0;
// Importing necessary functions and types from the "zod" library
const zod_1 = require("zod");
// Defining a schema for a container object using Zod
exports.containerSchema = (0, zod_1.object)({
    // The "name" field is required and must be a string with at least 3 characters
    name: (0, zod_1.string)({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters long"),
    // The "description" field is optional and can be a string
    description: (0, zod_1.string)().optional(),
    // The "imageUrl" field is required and must be a valid URL string
    imageUrl: (0, zod_1.string)({ required_error: "Image URL is required" }).url("Invalid URL format"),
    // The "price" field is required and must be a positive number
    price: (0, zod_1.number)({ required_error: "Price is required" }).min(1, "Price must be a positive number"),
    // The "height" field is required and must be a non-negative number
    height: (0, zod_1.number)({ required_error: "Height is required" }).min(0, "Height must be a positive number"),
    // The "width" field is required and must be a non-negative number
    width: (0, zod_1.number)({ required_error: "Width is required" }).min(0, "Width must be a positive number"),
});
