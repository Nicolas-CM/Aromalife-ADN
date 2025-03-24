"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerSchema = void 0;
const zod_1 = require("zod");
exports.containerSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters long"),
    description: (0, zod_1.string)().optional(),
    imageUrl: (0, zod_1.string)({ required_error: "Image URL is required" }).url("Invalid URL format"),
    price: (0, zod_1.number)({ required_error: "Price is required" }).min(0, "Price must be a positive number"),
    height: (0, zod_1.number)({ required_error: "Height is required" }).min(0, "Height must be a positive number"),
    width: (0, zod_1.number)({ required_error: "Width is required" }).min(0, "Width must be a positive number"),
});
