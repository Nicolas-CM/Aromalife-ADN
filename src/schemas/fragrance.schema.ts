import { object, string, number } from "zod";

export const fragranceSchema = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name cannot be empty"
  ),
  color: string({ required_error: "Color is required" })
    .min(1, "Color cannot be empty")
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hexadecimal"),

  price: number({ required_error: "Price is required" }).min(
    0,
    "Price must be a positive number"
  ),
});
