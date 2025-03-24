import { Router } from "express";
import { cartController } from "../controllers";
import { auth, validateSchema, authorize } from "../middlewares";
import { cartSchema } from "../schemas";

export const cartRouter = Router();

cartRouter.get(
  "/",
  auth,
  authorize(["superadmin", "manager", "client"]),
  cartController.getAll
);

cartRouter.post(
  "/",
  auth,
  authorize(["superadmin", "manager", "client"]),
  validateSchema(cartSchema),
  cartController.create
);

cartRouter.get(
  "/:id",
  auth,
  authorize(["superadmin", "manager", "client"]),
  cartController.get
);

cartRouter.put(
  "/:id",
  auth,
  authorize(["superadmin", "manager", "client"]),
  validateSchema(cartSchema),
  cartController.update
);

cartRouter.delete(
  "/:id",
  auth,
  authorize(["superadmin", "manager", "client"]),
  cartController.delete
);
