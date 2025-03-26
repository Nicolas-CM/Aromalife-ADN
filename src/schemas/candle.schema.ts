// Import necessary functions and types from the "zod" library
import { object, string, enum as zodEnum } from "zod";

// Define the schema for candle customization
export const candleCustomizationSchema = object({
  // User ID is required and must be a string
  userId: string({ required_error: "User ID is required" }),

  // Container ID is required, must be a string, and must match the ObjectId format
  containerId: string({ required_error: "Container ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format" // Error message for invalid format
  ),

  // Fragrance ID is required, must be a string, and must match the ObjectId format
  fragranceId: string({ required_error: "Fragrance ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format" // Error message for invalid format
  ),

  // Custom image URL is required and must be a valid URL
  customImage: string({ required_error: "Custom image URL is required" }).url(
    "Invalid URL format" // Error message for invalid URL
  ),

  // Status is required and must be either "draft" or "completed"
  status: zodEnum(["draft", "completed"], {
    errorMap: () => ({ message: "Status must be 'draft' or 'completed'" }), // Custom error message
  }),

  // AI-generated message is optional
  aiMessage: string().optional(),

  // VR preview URL is optional
  vrPreview: string().optional(),
});
