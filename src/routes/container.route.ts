import { Router } from "express";
import { containerController } from "../controllers";
import { auth, validateSchema, authorize } from "../middlewares";
import { containerSchema } from "../schemas";

export const containerRouter = Router();

// Obtener todos los contenedores (accesible solo para superadmin y manager)
containerRouter.get(
  "/",
  auth,
  authorize(["superadmin", "manager", "client"]),
  containerController.getAll
);

// Crear un nuevo contenedor (solo superadmin)
containerRouter.post(
  "/",
  auth,
  authorize(["superadmin"]),
  validateSchema(containerSchema),
  containerController.create
);

// Obtener un contenedor por ID (accesible para todos los roles autenticados)
containerRouter.get(
  "/:id",
  auth,
  authorize(["superadmin", "manager", "client"]),
  containerController.get
);

// Actualizar un contenedor por ID (solo superadmin)
containerRouter.put(
  "/:id",
  auth,
  authorize(["superadmin"]),
  validateSchema(containerSchema),
  containerController.update
);

// Eliminar un contenedor por ID (solo superadmin)
containerRouter.delete(
  "/:id",
  auth,
  authorize(["superadmin"]),
  containerController.delete
);
