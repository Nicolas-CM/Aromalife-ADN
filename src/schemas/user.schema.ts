import { object, string, number, array } from "zod";

export const userSchema = object({
  name: string({ required_error: "Name is required" }),
  email: string({ required_error: "Name is required" }).email(
    "Not a valid email address"
  ),
  password: string({ required_error: "Name is required" }).min(
    8,
    "Password  must be at least 8 characters long"
  ),
  age: number({ required_error: "Age is required" })
    .int("Age must be a integer")
    .positive("Age must be a positive number"),
  roles: array(
    string().refine(
      (role) => ["client", "superadmin", "manager"].includes(role),
      {
        message: "Role must be one of 'client', 'superadmin', or 'manager'",
      }
    )
  ),
});
