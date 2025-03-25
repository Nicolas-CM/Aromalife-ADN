import { object, string, number } from "zod";

export const giftSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name cannot be empty"
  ),
  description: string().optional(),
  price: number({ required_error: "Price is required" }).min(
    0,
    "Price must be a positive number"
  ),
  imageUrl: string().url("Must be a valid URL").optional(),
});
