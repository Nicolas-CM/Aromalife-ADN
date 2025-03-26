// Importing the Router from Express
import { Router } from "express";

// Importing the container controller
import { containerController } from "../controllers";

// Importing middlewares for authentication, schema validation, and authorization
import { auth, validateSchema, authorize } from "../middlewares";

// Importing the schema for container validation
import { containerSchema } from "../schemas";

// Creating a new router instance for container routes
export const containerRouter = Router();

// Route to get all containers
// Accessible only for superadmin, manager, and client roles
containerRouter.get(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  containerController.getAll // Controller method to handle the request
);

// Route to create a new container
// Accessible only for superadmin role
containerRouter.post(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(containerSchema), // Middleware to validate the request body against the schema
  containerController.create // Controller method to handle the request
);

// Route to get a container by ID
// Accessible for all authenticated roles
containerRouter.get(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  containerController.get // Controller method to handle the request
);

// Route to update a container by ID
// Accessible only for superadmin role
containerRouter.put(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(containerSchema), // Middleware to validate the request body against the schema
  containerController.update // Controller method to handle the request
);

// Route to delete a container by ID
// Accessible only for superadmin role
containerRouter.delete(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  containerController.delete // Controller method to handle the request
);