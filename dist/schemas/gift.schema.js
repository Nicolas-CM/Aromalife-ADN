"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftSchema = void 0;
// Importing necessary functions and types from the "zod" library
const zod_1 = require("zod");
// Defining a schema for a gift object using zod
exports.giftSchema = (0, zod_1.object)({
    // The "name" field is required and must be a non-empty string
    name: (0, zod_1.string)({ required_error: "Name is required" }).min(1, "Name cannot be empty"),
    // The "description" field is optional and can be a string
    description: (0, zod_1.string)().optional(),
    // The "price" field is required and must be a positive number
    price: (0, zod_1.number)({ required_error: "Price is required" }).min(0, "Price must be a positive number"),
    // The "imageUrl" field is optional and must be a valid URL if provided
    imageUrl: (0, zod_1.string)().url("Must be a valid URL").optional(),
});
