import { Router } from "express";
import { giftController } from "../controllers";
import { auth, validateSchema, authorize } from "../middlewares";
import { giftSchema } from "../schemas";

export const giftRouter = Router();

// Obtener todos los regalos (accesible para superadmin, manager y client)
giftRouter.get(
  "/",
  auth,
  authorize(["superadmin", "manager", "client"]),
  giftController.getAll
);

// Crear un nuevo regalo (solo superadmin)
giftRouter.post(
  "/",
  auth,
  authorize(["superadmin"]),
  validateSchema(giftSchema),
  giftController.create
);

// Obtener un regalo por ID (accesible para todos los roles autenticados)
giftRouter.get(
  "/:id",
  auth,
  authorize(["superadmin", "manager", "client"]),
  giftController.get
);

// Actualizar un regalo por ID (solo superadmin)
giftRouter.put(
  "/:id",
  auth,
  authorize(["superadmin"]),
  validateSchema(giftSchema),
  giftController.update
);

// Eliminar un regalo por ID (solo superadmin)
giftRouter.delete(
  "/:id",
  auth,
  authorize(["superadmin"]),
  giftController.delete
);
