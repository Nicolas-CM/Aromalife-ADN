// Importing the `object` and `string` functions from the `zod` library
import { object, string } from "zod";

// Defining a schema for login validation using `zod`
export const loginSchema = object({
  // Validating the `email` field: it is required and must be a valid email address
  email: string({ required_error: "Email is required" }).email(
    "Not a valid email address"
  ),
  // Validating the `password` field: it is required and must have a minimum length of 8 characters
  password: string({ required_error: "Password is required" }).min(
    8,
    "Password must be at least 8 characters long"
  ),
});
