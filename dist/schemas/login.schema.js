"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
// Importing the `object` and `string` functions from the `zod` library
const zod_1 = require("zod");
// Defining a schema for login validation using `zod`
exports.loginSchema = (0, zod_1.object)({
    // Validating the `email` field: it is required and must be a valid email address
    email: (0, zod_1.string)({ required_error: "Email is required" }).email("Not a valid email address"),
    // Validating the `password` field: it is required and must have a minimum length of 8 characters
    password: (0, zod_1.string)({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
});
