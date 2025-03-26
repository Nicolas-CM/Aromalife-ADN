// Import the Router class from the express library
import { Router } from "express";
// Import the userController from the controllers module
import { userController } from "../controllers";
// Import middleware functions: auth, validateSchema, and authorize
import { auth, validateSchema, authorize } from "../middlewares";
// Import schemas for user and login validation
import { userSchema, loginSchema } from "../schemas";

// Create a new Router instance
export const userRouter = Router();

// Define a GET route to fetch all users, accessible only to superadmins
userRouter.get("/", auth, authorize(["superadmin"]), userController.getAll);

// Define a POST route to create a new user, accessible only to superadmins
userRouter.post(
  "/",
  auth,
  authorize(["superadmin"]),
  validateSchema(userSchema),
  userController.create
);

// Define a GET route to fetch the profile of the authenticated user, accessible to superadmins, managers, and clients
userRouter.get(
  "/profile",
  auth,
  authorize(["superadmin", "manager", "client"]),
  userController.get
);

// Define a GET route to fetch a user by ID, accessible to superadmins and managers
userRouter.get(
  "/:id",
  auth,
  authorize(["superadmin", "manager"]),
  userController.get
);

// Define a PUT route to update a user by ID, accessible only to superadmins
userRouter.put("/:id", auth, authorize(["superadmin"]), userController.update);

// Define a DELETE route to remove a user by ID, accessible only to superadmins
userRouter.delete(
  "/:id",
  auth,
  authorize(["superadmin"]),
  userController.delete
);

// Define a POST route for user login, validating the request body with the login schema
userRouter.post("/login", validateSchema(loginSchema), userController.login);
