// Import necessary functions and types from the "zod" library
import { object, string, number, array } from "zod";

// Define a schema for user validation using zod
export const userSchema = object({
  // Validate the "name" field as a required string
  name: string({ required_error: "Name is required" }),

  // Validate the "email" field as a required string and ensure it is a valid email address
  email: string({ required_error: "Name is required" }).email(
    "Not a valid email address"
  ),

  // Validate the "password" field as a required string with a minimum length of 8 characters
  password: string({ required_error: "Name is required" }).min(
    8,
    "Password  must be at least 8 characters long"
  ),

  // Validate the "age" field as a required positive integer
  age: number({ required_error: "Age is required" })
    .int("Age must be a integer")
    .positive("Age must be a positive number"),

  // Validate the "roles" field as an array of strings, ensuring each string is one of the allowed roles
  roles: array(
    string().refine(
      (role) => ["client", "superadmin", "manager"].includes(role),
      {
        message: "Role must be one of 'client', 'superadmin', or 'manager'",
      }
    )
  ),
});
