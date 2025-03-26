// Importing the Router from Express
import { Router } from "express";

// Importing the candle customization controller
import { candleCustomizationController } from "../controllers";

// Importing middlewares for authentication, schema validation, and authorization
import { auth, validateSchema, authorize } from "../middlewares";

// Importing the schema for candle customization validation
import { candleCustomizationSchema } from "../schemas";

// Creating a new router instance for candle routes
export const candleRouter = Router();

// Route to get all candle customizations
// Accessible only for superadmin, manager, and client roles
candleRouter.get(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  candleCustomizationController.getAll // Controller method to handle the request
);

// Route to create a new candle customization
// Accessible only for superadmin role
candleRouter.post(
  "/",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(candleCustomizationSchema), // Middleware to validate the request body against the schema
  candleCustomizationController.create // Controller method to handle the request
);

// Route to get a candle customization by ID
// Accessible for all authenticated roles
candleRouter.get(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
  candleCustomizationController.get // Controller method to handle the request
);

// Route to update a candle customization by ID
// Accessible only for superadmin role
candleRouter.put(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  validateSchema(candleCustomizationSchema), // Middleware to validate the request body against the schema
  candleCustomizationController.update // Controller method to handle the request
);

// Route to delete a candle customization by ID
// Accessible only for superadmin role
candleRouter.delete(
  "/:id",
  auth, // Middleware to authenticate the user
  authorize(["superadmin"]), // Middleware to authorize the superadmin role
  candleCustomizationController.delete // Controller method to handle the request
);