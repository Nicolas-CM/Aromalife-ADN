// Importing necessary functions and types from the "zod" library
import { object, string, number } from "zod";

// Defining a schema for a gift object using zod
export const giftSchema = object({
  // The "name" field is required and must be a non-empty string
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name cannot be empty"
  ),
  // The "description" field is optional and can be a string
  description: string().optional(),
  // The "price" field is required and must be a positive number
  price: number({ required_error: "Price is required" }).min(
    0,
    "Price must be a positive number"
  ),
  // The "imageUrl" field is optional and must be a valid URL if provided
  imageUrl: string().url("Must be a valid URL").optional(),
});
