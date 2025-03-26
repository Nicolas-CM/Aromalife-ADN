"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
// Importing the Router from Express
const express_1 = require("express");
// Importing the cart controller
const controllers_1 = require("../controllers");
// Importing middlewares for authentication, schema validation, and authorization
const middlewares_1 = require("../middlewares");
// Importing the schema for cart validation
const schemas_1 = require("../schemas");
// Creating a new router instance for cart routes
exports.cartRouter = (0, express_1.Router)();
// Route to get all carts
// Accessible only for superadmin, manager, and client roles
exports.cartRouter.get("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.cartController.getAll // Controller method to handle the request
);
// Route to create a new cart
// Accessible for superadmin, manager, and client roles
exports.cartRouter.post("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
(0, middlewares_1.validateSchema)(schemas_1.cartSchema), // Middleware to validate the request body against the schema
controllers_1.cartController.create // Controller method to handle the request
);
// Route to get a cart by ID
// Accessible for superadmin, manager, and client roles
exports.cartRouter.get("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.cartController.get // Controller method to handle the request
);
// Route to update a cart by ID
// Accessible for superadmin, manager, and client roles
exports.cartRouter.put("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
(0, middlewares_1.validateSchema)(schemas_1.cartSchema), // Middleware to validate the request body against the schema
controllers_1.cartController.update // Controller method to handle the request
);
// Route to delete a cart by ID
// Accessible for superadmin, manager, and client roles
exports.cartRouter.delete("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.cartController.delete // Controller method to handle the request
);
