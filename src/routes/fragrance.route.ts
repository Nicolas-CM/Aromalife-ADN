// Importing the Router from Express
import { Router } from "express";

// Importing the fragrance controller
import { fragranceController } from "../controllers";

// Importing middlewares for authentication, schema validation, and authorization
import { auth, validateSchema, authorize } from "../middlewares";

// Importing the schema for fragrance validation
import { fragranceSchema } from "../schemas";

// Creating a new router instance for fragrance routes
export const fragranceRouter = Router();

// Route to get all fragrances
// Accessible only for superadmin, manager, and client roles
fragranceRouter.get(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  fragranceController.getAll // Controller method to handle the request
);

// Route to create a new fragrance
// Accessible only for superadmin role
fragranceRouter.post(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(fragranceSchema), // Middleware to validate the request body against the schema
  fragranceController.create // Controller method to handle the request
);

// Route to get a fragrance by ID
// Accessible for all authenticated roles
fragranceRouter.get(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  fragranceController.get // Controller method to handle the request
);

// Route to update a fragrance by ID
// Accessible only for superadmin role
fragranceRouter.put(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(fragranceSchema), // Middleware to validate the request body against the schema
  fragranceController.update // Controller method to handle the request
);

// Route to delete a fragrance by ID
// Accessible only for superadmin role
fragranceRouter.delete(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  fragranceController.delete // Controller method to handle the request
);