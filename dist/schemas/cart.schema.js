"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.cartGiftSchema = exports.cartItemSchema = void 0;
// Import necessary functions and types from the "zod" library
const zod_1 = require("zod");
// Define a schema for a cart item, which includes a candle ID and quantity
// The candle ID must be a valid ObjectId format, and quantity must be at least 1
exports.cartItemSchema = (0, zod_1.object)({
    candleId: (0, zod_1.string)({ required_error: "Product ID is required" }).regex(/^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format"),
    quantity: (0, zod_1.number)({ required_error: "Quantity is required" }).min(1, // Minimum quantity is 1
    "Quantity must be at least 1"),
});
// Define a schema for a cart gift, which includes a gift ID and quantity
// The gift ID must be a valid ObjectId format, and quantity must be at least 1
exports.cartGiftSchema = (0, zod_1.object)({
    giftId: (0, zod_1.string)({ required_error: "Gift ID is required" }).regex(/^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format"),
    quantity: (0, zod_1.number)({ required_error: "Quantity is required" }).min(1, // Minimum quantity is 1
    "Quantity must be at least 1"),
});
// Define a schema for the entire cart, which includes a user ID, items, and gifts
// The user ID must be a valid ObjectId format
// Items and gifts are arrays of their respective schemas
exports.cartSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)({ required_error: "User ID is required" }).regex(/^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format"),
    items: (0, zod_1.array)(exports.cartItemSchema), // Array of cart items
    gifts: (0, zod_1.array)(exports.cartGiftSchema), // Array of cart gifts
});
