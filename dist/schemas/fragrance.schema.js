"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragranceSchema = void 0;
// Importing necessary functions and types from the "zod" library
const zod_1 = require("zod");
// Defining the schema for a fragrance object
exports.fragranceSchema = (0, zod_1.object)({
    // The "name" field is required and must be a non-empty string
    name: (0, zod_1.string)({ required_error: "Name is required" }).min(1, "Name cannot be empty"),
    // The "color" field is required, must be a non-empty string, and must match a valid hexadecimal color format
    color: (0, zod_1.string)({ required_error: "Color is required" })
        .min(1, "Color cannot be empty")
        .regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hexadecimal"),
    // The "price" field is required and must be a positive number
    price: (0, zod_1.number)({ required_error: "Price is required" }).min(0, "Price must be a positive number"),
});
