"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftSchema = void 0;
const zod_1 = require("zod");
exports.giftSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Name is required" }).min(1, "Name cannot be empty"),
    description: (0, zod_1.string)().optional(),
    price: (0, zod_1.number)({ required_error: "Price is required" }).min(0, "Price must be a positive number"),
    imageUrl: (0, zod_1.string)().url("Must be a valid URL").optional(),
});
