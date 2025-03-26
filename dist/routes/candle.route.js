"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candleRouter = void 0;
// Importing the Router from Express
const express_1 = require("express");
// Importing the candle customization controller
const controllers_1 = require("../controllers");
// Importing middlewares for authentication, schema validation, and authorization
const middlewares_1 = require("../middlewares");
// Importing the schema for candle customization validation
const schemas_1 = require("../schemas");
// Creating a new router instance for candle routes
exports.candleRouter = (0, express_1.Router)();
// Route to get all candle customizations
// Accessible only for superadmin, manager, and client roles
exports.candleRouter.get("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.candleCustomizationController.getAll // Controller method to handle the request
);
// Route to create a new candle customization
// Accessible only for superadmin role
exports.candleRouter.post("/", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
(0, middlewares_1.validateSchema)(schemas_1.candleCustomizationSchema), // Middleware to validate the request body against the schema
controllers_1.candleCustomizationController.create // Controller method to handle the request
);
// Route to get a candle customization by ID
// Accessible for all authenticated roles
exports.candleRouter.get("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin", "manager", "client"]), // Middleware to authorize specific roles
controllers_1.candleCustomizationController.get // Controller method to handle the request
);
// Route to update a candle customization by ID
// Accessible only for superadmin role
exports.candleRouter.put("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
(0, middlewares_1.validateSchema)(schemas_1.candleCustomizationSchema), // Middleware to validate the request body against the schema
controllers_1.candleCustomizationController.update // Controller method to handle the request
);
// Route to delete a candle customization by ID
// Accessible only for superadmin role
exports.candleRouter.delete("/:id", middlewares_1.auth, // Middleware to authenticate the user
(0, middlewares_1.authorize)(["superadmin"]), // Middleware to authorize the superadmin role
controllers_1.candleCustomizationController.delete // Controller method to handle the request
);
