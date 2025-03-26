import { object, string, array, number } from "zod";

export const cartItemSchema = object({
  candleId: string({ required_error: "Product ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/,
    "Invalid ObjectId format"
  ),
  quantity: number({ required_error: "Quantity is required" }).min(
    1,
    "Quantity must be at least 1"
  ),
});

export const cartGiftSchema = object({
  giftId: string({ required_error: "Gift ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/,
    "Invalid ObjectId format"
  ),
  quantity: number({ required_error: "Quantity is required" }).min(
    1,
    "Quantity must be at least 1"
  ),
});

export const cartSchema = object({
  userId: string({ required_error: "User ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/,
    "Invalid ObjectId format"
  ),
  items: array(cartItemSchema), gifts: array(cartGiftSchema)
});

