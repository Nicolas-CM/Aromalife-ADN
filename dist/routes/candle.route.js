"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candleRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
exports.candleRouter = (0, express_1.Router)();
// Obtener todas las personalizaciones de velas (accesible solo para superadmin y manager)
exports.candleRouter.get("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.candleCustomizationController.getAll);
// Crear una nueva personalización de vela (solo superadmin)
exports.candleRouter.post("/", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.candleCustomizationSchema), controllers_1.candleCustomizationController.create);
// Obtener una personalización de vela por ID (accesible para todos los roles autenticados)
exports.candleRouter.get("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin", "manager", "client"]), controllers_1.candleCustomizationController.get);
// Actualizar una personalización de vela por ID (solo superadmin)
exports.candleRouter.put("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), (0, middlewares_1.validateSchema)(schemas_1.candleCustomizationSchema), controllers_1.candleCustomizationController.update);
// Eliminar una personalización de vela por ID (solo superadmin)
exports.candleRouter.delete("/:id", middlewares_1.auth, (0, middlewares_1.authorize)(["superadmin"]), controllers_1.candleCustomizationController.delete);
