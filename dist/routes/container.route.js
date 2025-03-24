"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
exports.containerRouter = (0, express_1.Router)();
// Obtener todos los contenedores (accesible solo para superadmin y manager)
exports.containerRouter.get("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.containerController.getAll);
// Crear un nuevo contenedor (solo superadmin)
exports.containerRouter.post("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.containerSchema), controllers_1.containerController.create);
// Obtener un contenedor por ID (accesible para todos los roles autenticados)
exports.containerRouter.get("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.containerController.get);
// Actualizar un contenedor por ID (solo superadmin)
exports.containerRouter.put("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.containerSchema), controllers_1.containerController.update);
// Eliminar un contenedor por ID (solo superadmin)
exports.containerRouter.delete("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), controllers_1.containerController.delete);
