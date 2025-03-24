import { Request, Response, Router } from "express";
import { fragranceController } from "../controllers";
import { auth, validateSchema, authorize } from "../middlewares";
import { fragranceSchema } from "../schemas";

export const fragranceRouter = Router();

// Obtener todas las fragancias (accesible solo para superadmin y manager)
fragranceRouter.get(
  "/",
  auth,
  authorize(["superadmin", "manager", "client"]),
  fragranceController.getAll
);

// Crear una nueva fragancia (solo superadmin)
fragranceRouter.post(
  "/",
  auth,
  authorize(["superadmin"]),
  validateSchema(fragranceSchema),
  fragranceController.create
);

// Obtener una fragancia por ID (accesible para todos los roles autenticados)
fragranceRouter.get(
  "/:id",
  auth,
  authorize(["superadmin", "manager", "client"]),
  fragranceController.get
);

// Actualizar una fragancia por ID (solo superadmin)
fragranceRouter.put(
  "/:id",
  auth,
  authorize(["superadmin"]),
  validateSchema(fragranceSchema),
  fragranceController.update
);

// Eliminar una fragancia por ID (solo superadmin)
fragranceRouter.delete(
  "/:id",
  auth,
  authorize(["superadmin"]),
  fragranceController.delete
);
