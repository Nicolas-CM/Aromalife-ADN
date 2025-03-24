"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragranceSchema = void 0;
const zod_1 = require("zod");
exports.fragranceSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Name is required" }).min(1, "Name cannot be empty"),
    color: (0, zod_1.string)({ required_error: "Color is required" })
        .min(1, "Color cannot be empty")
        .regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hexadecimal"),
    price: (0, zod_1.number)({ required_error: "Price is required" }).min(0, "Price must be a positive number"),
});
