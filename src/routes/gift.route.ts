// Importing the Router from Express
import { Router } from "express";

// Importing the gift controller
import { giftController } from "../controllers";

// Importing middlewares for authentication, schema validation, and authorization
import { auth, validateSchema, authorize } from "../middlewares";

// Importing the schema for gift validation
import { giftSchema } from "../schemas";

// Creating a new router instance for gift routes
export const giftRouter = Router();

// Route to get all gifts
// Accessible for superadmin, manager, and client roles
giftRouter.get(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  giftController.getAll // Controller method to handle the request
);

// Route to create a new gift
// Accessible only for superadmin role
giftRouter.post(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(giftSchema), // Middleware to validate the request body against the schema
  giftController.create // Controller method to handle the request
);

// Route to get a gift by ID
// Accessible for all authenticated roles
giftRouter.get(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  giftController.get // Controller method to handle the request
);

// Route to update a gift by ID
// Accessible only for superadmin role
giftRouter.put(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(giftSchema), // Middleware to validate the request body against the schema
  giftController.update // Controller method to handle the request
);

// Route to delete a gift by ID
// Accessible only for superadmin role
giftRouter.delete(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  giftController.delete // Controller method to handle the request
);