"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Name is required" }),
    email: (0, zod_1.string)({ required_error: "Name is required" }).email("Not a valid email address"),
    password: (0, zod_1.string)({ required_error: "Name is required" }).min(8, "Password  must be at least 8 characters long"),
    age: (0, zod_1.number)({ required_error: "Age is required" }).int("Age must be a integer"),
    roles: (0, zod_1.array)((0, zod_1.string)().refine((role) => ["client", "superadmin", "manager"].includes(role), {
        message: "Role must be one of 'client', 'superadmin', or 'manager'",
    })),
});
