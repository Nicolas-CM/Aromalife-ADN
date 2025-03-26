// Importing necessary functions and types from the "zod" library
import { object, string, number } from "zod";

// Defining the schema for a fragrance object
export const fragranceSchema = object({
  // The "name" field is required and must be a non-empty string
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name cannot be empty"
  ),
  // The "color" field is required, must be a non-empty string, and must match a valid hexadecimal color format
  color: string({ required_error: "Color is required" })
    .min(1, "Color cannot be empty")
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hexadecimal"),

  // The "price" field is required and must be a positive number
  price: number({ required_error: "Price is required" }).min(
    0,
    "Price must be a positive number"
  ),
});
