"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragranceRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
exports.fragranceRouter = (0, express_1.Router)();
// Obtener todas las fragancias (accesible solo para superadmin y manager)
exports.fragranceRouter.get("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.fragranceController.getAll);
// Crear una nueva fragancia (solo superadmin)
exports.fragranceRouter.post("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.fragranceSchema), controllers_1.fragranceController.create);
// Obtener una fragancia por ID (accesible para todos los roles autenticados)
exports.fragranceRouter.get("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.fragranceController.get);
// Actualizar una fragancia por ID (solo superadmin)
exports.fragranceRouter.put("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.fragranceSchema), controllers_1.fragranceController.update);
// Eliminar una fragancia por ID (solo superadmin)
exports.fragranceRouter.delete("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), controllers_1.fragranceController.delete);
