"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candleCustomizationSchema = void 0;
// Import necessary functions and types from the "zod" library
const zod_1 = require("zod");
// Define the schema for candle customization
exports.candleCustomizationSchema = (0, zod_1.object)({
    // User ID is required and must be a string
    userId: (0, zod_1.string)({ required_error: "User ID is required" }),
    // Container ID is required, must be a string, and must match the ObjectId format
    containerId: (0, zod_1.string)({ required_error: "Container ID is required" }).regex(/^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format" // Error message for invalid format
    ),
    // Fragrance ID is required, must be a string, and must match the ObjectId format
    fragranceId: (0, zod_1.string)({ required_error: "Fragrance ID is required" }).regex(/^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format" // Error message for invalid format
    ),
    // Custom image URL is required and must be a valid URL
    customImage: (0, zod_1.string)({ required_error: "Custom image URL is required" }).url("Invalid URL format" // Error message for invalid URL
    ),
    // Status is required and must be either "draft" or "completed"
    status: (0, zod_1.enum)(["draft", "completed"], {
        errorMap: () => ({ message: "Status must be 'draft' or 'completed'" }), // Custom error message
    }),
    // AI-generated message is optional
    aiMessage: (0, zod_1.string)().optional(),
    // VR preview URL is optional
    vrPreview: (0, zod_1.string)().optional(),
});
