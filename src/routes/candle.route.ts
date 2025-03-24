import { Router } from "express";
import { candleCustomizationController } from "../controllers";
import { auth, validateSchema, authorize } from "../middlewares";
import { candleCustomizationSchema } from "../schemas";

export const candleRouter = Router();

// Obtener todas las personalizaciones de velas (accesible solo para superadmin y manager)
candleRouter.get(
  "/",
  auth,
  authorize(["superadmin", "manager", "client"]),
  candleCustomizationController.getAll
);

// Crear una nueva personalización de vela (solo superadmin)
candleRouter.post(
  "/",
  auth,
  authorize(["superadmin"]),
  validateSchema(candleCustomizationSchema),
  candleCustomizationController.create
);

// Obtener una personalización de vela por ID (accesible para todos los roles autenticados)
candleRouter.get(
  "/:id",
  auth,
  authorize(["superadmin", "manager", "client"]),
  candleCustomizationController.get
);

// Actualizar una personalización de vela por ID (solo superadmin)
candleRouter.put(
  "/:id",
  auth,
  authorize(["superadmin"]),
  validateSchema(candleCustomizationSchema),
  candleCustomizationController.update
);

// Eliminar una personalización de vela por ID (solo superadmin)
candleRouter.delete(
  "/:id",
  auth,
  authorize(["superadmin"]),
  candleCustomizationController.delete
);
