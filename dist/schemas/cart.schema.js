"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.cartGiftSchema = exports.cartItemSchema = void 0;
const zod_1 = require("zod");
exports.cartItemSchema = (0, zod_1.object)({
    candleId: (0, zod_1.string)({ required_error: "Product ID is required" }).regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format"),
    quantity: (0, zod_1.number)({ required_error: "Quantity is required" }).min(1, "Quantity must be at least 1"),
});
exports.cartGiftSchema = (0, zod_1.object)({
    giftId: (0, zod_1.string)({ required_error: "Gift ID is required" }).regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format"),
    quantity: (0, zod_1.number)({ required_error: "Quantity is required" }).min(1, "Quantity must be at least 1"),
});
exports.cartSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)({ required_error: "User ID is required" }).regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format"),
    items: (0, zod_1.array)(exports.cartItemSchema), gifts: (0, zod_1.array)(exports.cartGiftSchema)
});
