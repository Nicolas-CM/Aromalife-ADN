import { object, string, number } from "zod";

export const userSchema = object({
  name: string({ required_error: "Name is required" }),
  email: string({ required_error: "Name is required" }).email(
    "Not a valid email address"
  ),
  password: string({ required_error: "Name is required" }).min(
    8,
    "Password  must be at least 8 characteres long"
  ),
  age: number({ required_error: "Age is required" }).int(
    "Age must be a integer"
  ),
  roles: string().array().optional(),
});
