"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
exports.giftRouter = (0, express_1.Router)();
// Obtener todos los regalos (accesible para superadmin, manager y client)
exports.giftRouter.get("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.giftController.getAll);
// Crear un nuevo regalo (solo superadmin)
exports.giftRouter.post("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.giftSchema), controllers_1.giftController.create);
// Obtener un regalo por ID (accesible para todos los roles autenticados)
exports.giftRouter.get("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.giftController.get);
// Actualizar un regalo por ID (solo superadmin)
exports.giftRouter.put("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.giftSchema), controllers_1.giftController.update);
// Eliminar un regalo por ID (solo superadmin)
exports.giftRouter.delete("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), controllers_1.giftController.delete);
