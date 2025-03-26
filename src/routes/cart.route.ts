// Importing the Router from Express
import { Router } from "express";

// Importing the cart controller
import { cartController } from "../controllers";

// Importing middlewares for authentication, schema validation, and authorization
import { auth, validateSchema, authorize } from "../middlewares";

// Importing the schema for cart validation
import { cartSchema } from "../schemas";

// Creating a new router instance for cart routes
export const cartRouter = Router();

// Route to get all carts
// Accessible only for superadmin, manager, and client roles
cartRouter.get(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  cartController.getAll // Controller method to handle the request
);

// Route to create a new cart
// Accessible for superadmin, manager, and client roles
cartRouter.post(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  validateSchema(cartSchema), // Middleware to validate the request body against the schema
  cartController.create // Controller method to handle the request
);

// Route to get a cart by ID
// Accessible for superadmin, manager, and client roles
cartRouter.get(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  cartController.get // Controller method to handle the request
);

// Route to update a cart by ID
// Accessible for superadmin, manager, and client roles
cartRouter.put(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  validateSchema(cartSchema), // Middleware to validate the request body against the schema
  cartController.update // Controller method to handle the request
);

// Route to delete a cart by ID
// Accessible for superadmin, manager, and client roles
cartRouter.delete(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  cartController.delete // Controller method to handle the request
);