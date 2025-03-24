import { Router } from "express";
import { userRouter } from "./user.route";
import { fragranceRouter } from "./fragrance.route";
import { containerRouter } from "./container.route";
import { cartRouter } from "./cart.route";

const router = Router();

// Registrar todas las rutas aquí
router.use("/user", userRouter);
router.use("/fragrance", fragranceRouter);
router.use("/container", containerRouter);
router.use("/cart", cartRouter);

export default router;
