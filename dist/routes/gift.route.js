"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftRouter = void 0;
// Importing the Router from Express
const express_1 = require("express");
// Importing the gift controller
const controllers_1 = require("../controllers");
// Importing middlewares for authentication, schema validation, and authorization
const middlewares_1 = require("../middlewares");
// Importing the schema for gift validation
const schemas_1 = require("../schemas");
// Creating a new router instance for gift routes
exports.giftRouter = (0, express_1.Router)();
// Route to get all gifts
// Accessible for superadmin, manager, and client roles
exports.giftRouter.get("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.giftController.getAll // Controller method to handle the request
);
// Route to create a new gift
// Accessible only for superadmin role
exports.giftRouter.post("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
(0, middlewares_1.validateSchema)(schemas_1.giftSchema), // Middleware to validate the request body against the schema
controllers_1.giftController.create // Controller method to handle the request
);
// Route to get a gift by ID
// Accessible for all authenticated roles
exports.giftRouter.get("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.giftController.get // Controller method to handle the request
);
// Route to update a gift by ID
// Accessible only for superadmin role
exports.giftRouter.put("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
(0, middlewares_1.validateSchema)(schemas_1.giftSchema), // Middleware to validate the request body against the schema
controllers_1.giftController.update // Controller method to handle the request
);
// Route to delete a gift by ID
// Accessible only for superadmin role
exports.giftRouter.delete("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
controllers_1.giftController.delete // Controller method to handle the request
);
