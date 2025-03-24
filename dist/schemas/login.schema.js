"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = (0, zod_1.object)({
    email: (0, zod_1.string)({ required_error: "Email is required" }).email("Not a valid email address"),
    password: (0, zod_1.string)({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
});
