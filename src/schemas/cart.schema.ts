// Import necessary functions and types from the "zod" library
import { object, string, array, number } from "zod";

// Define a schema for a cart item, which includes a candle ID and quantity
// The candle ID must be a valid ObjectId format, and quantity must be at least 1
export const cartItemSchema = object({
  candleId: string({ required_error: "Product ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format"
  ),
  quantity: number({ required_error: "Quantity is required" }).min(
    1, // Minimum quantity is 1
    "Quantity must be at least 1"
  ),
});

// Define a schema for a cart gift, which includes a gift ID and quantity
// The gift ID must be a valid ObjectId format, and quantity must be at least 1
export const cartGiftSchema = object({
  giftId: string({ required_error: "Gift ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format"
  ),
  quantity: number({ required_error: "Quantity is required" }).min(
    1, // Minimum quantity is 1
    "Quantity must be at least 1"
  ),
});

// Define a schema for the entire cart, which includes a user ID, items, and gifts
// The user ID must be a valid ObjectId format
// Items and gifts are arrays of their respective schemas
export const cartSchema = object({
  userId: string({ required_error: "User ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/, // Regular expression to validate ObjectId format
    "Invalid ObjectId format"
  ),
  items: array(cartItemSchema), // Array of cart items
  gifts: array(cartGiftSchema), // Array of cart gifts
});
