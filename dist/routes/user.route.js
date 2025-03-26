"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// Import the Router class from the express library
const express_1 = require("express");
// Import the userController from the controllers module
const controllers_1 = require("../controllers");
// Import middleware functions: auth, validateSchema, and authorize
const middlewares_1 = require("../middlewares");
// Import schemas for user and login validation
const schemas_1 = require("../schemas");
// Create a new Router instance
exports.userRouter = (0, express_1.Router)();
// Define a GET route to fetch all users, accessible only to superadmins
exports.userRouter.get("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), controllers_1.userController.getAll);
// Define a POST route to create a new user, accessible only to superadmins
exports.userRouter.post("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.userSchema), controllers_1.userController.create);
// Define a GET route to fetch the profile of the authenticated user, accessible to superadmins, managers, and clients
exports.userRouter.get("/profile", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.userController.get);
// Define a GET route to fetch a user by ID, accessible to superadmins and managers
exports.userRouter.get("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager"]), controllers_1.userController.get);
// Define a PUT route to update a user by ID, accessible only to superadmins
exports.userRouter.put("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), controllers_1.userController.update);
// Define a DELETE route to remove a user by ID, accessible only to superadmins
exports.userRouter.delete("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), controllers_1.userController.delete);
// Define a POST route for user login, validating the request body with the login schema
exports.userRouter.post("/login", (0, middlewares_1.validateSchema)(schemas_1.loginSchema), controllers_1.userController.login);
