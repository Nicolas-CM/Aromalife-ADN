"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candleCustomizationSchema = void 0;
const zod_1 = require("zod");
exports.candleCustomizationSchema = (0, zod_1.object)({
    userId: (0, zod_1.string)({ required_error: "User ID is required" }),
    containerId: (0, zod_1.string)({ required_error: "Container ID is required" }).regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format"),
    fragranceId: (0, zod_1.string)({ required_error: "Fragrance ID is required" }).regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format"),
    customImage: (0, zod_1.string)({ required_error: "Custom image URL is required" }).url("Invalid URL format"),
    status: (0, zod_1.enum)(["draft", "completed"], {
        errorMap: () => ({ message: "Status must be 'draft' or 'completed'" }),
    }),
    aiMessage: (0, zod_1.string)().optional(),
    vrPreview: (0, zod_1.string)().optional(),
});
