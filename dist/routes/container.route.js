"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerRouter = void 0;
// Importing the Router from Express
const express_1 = require("express");
// Importing the container controller
const controllers_1 = require("../controllers");
// Importing middlewares for authentication, schema validation, and authorization
const middlewares_1 = require("../middlewares");
// Importing the schema for container validation
const schemas_1 = require("../schemas");
// Creating a new router instance for container routes
exports.containerRouter = (0, express_1.Router)();
// Route to get all containers
// Accessible only for superadmin, manager, and client roles
exports.containerRouter.get("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.containerController.getAll // Controller method to handle the request
);
// Route to create a new container
// Accessible only for superadmin role
exports.containerRouter.post("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
(0, middlewares_1.validateSchema)(schemas_1.containerSchema), // Middleware to validate the request body against the schema
controllers_1.containerController.create // Controller method to handle the request
);
// Route to get a container by ID
// Accessible for all authenticated roles
exports.containerRouter.get("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.containerController.get // Controller method to handle the request
);
// Route to update a container by ID
// Accessible only for superadmin role
exports.containerRouter.put("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
(0, middlewares_1.validateSchema)(schemas_1.containerSchema), // Middleware to validate the request body against the schema
controllers_1.containerController.update // Controller method to handle the request
);
// Route to delete a container by ID
// Accessible only for superadmin role
exports.containerRouter.delete("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
controllers_1.containerController.delete // Controller method to handle the request
);
