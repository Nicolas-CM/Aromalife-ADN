// Importing necessary functions and types from the "zod" library
import { object, string, number } from "zod";

// Defining a schema for a container object using Zod
export const containerSchema = object({
  // The "name" field is required and must be a string with at least 3 characters
  name: string({ required_error: "Name is required" }).min(
    3,
    "Name must be at least 3 characters long"
  ),
  // The "description" field is optional and can be a string
  description: string().optional(),
  // The "imageUrl" field is required and must be a valid URL string
  imageUrl: string({ required_error: "Image URL is required" }).url(
    "Invalid URL format"
  ),
  // The "price" field is required and must be a positive number
  price: number({ required_error: "Price is required" }).min(
    1,
    "Price must be a positive number"
  ),
  // The "height" field is required and must be a non-negative number
  height: number({ required_error: "Height is required" }).min(
    0,
    "Height must be a positive number"
  ),
  // The "width" field is required and must be a non-negative number
  width: number({ required_error: "Width is required" }).min(
    0,
    "Width must be a positive number"
  ),
});
