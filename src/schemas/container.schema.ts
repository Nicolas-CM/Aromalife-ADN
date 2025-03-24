import { object, string, number } from "zod";

export const containerSchema = object({
  name: string({ required_error: "Name is required" }).min(
    3,
    "Name must be at least 3 characters long"
  ),
  description: string().optional(),
  imageUrl: string({ required_error: "Image URL is required" }).url(
    "Invalid URL format"
  ),
  price: number({ required_error: "Price is required" }).min(
    1,
    "Price must be a positive number"
  ),
  height: number({ required_error: "Height is required" }).min(
    0,
    "Height must be a positive number"
  ),
  width: number({ required_error: "Width is required" }).min(
    0,
    "Width must be a positive number"
  ),
});
