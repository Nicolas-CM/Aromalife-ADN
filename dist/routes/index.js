"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("./user.route");
const fragrance_route_1 = require("./fragrance.route");
const container_route_1 = require("./container.route");
const cart_route_1 = require("./cart.route");
const router = (0, express_1.Router)();
// Registrar todas las rutas aquí
router.use("/user", user_route_1.userRouter);
router.use("/fragrance", fragrance_route_1.fragranceRouter);
router.use("/container", container_route_1.containerRouter);
router.use("/cart", cart_route_1.cartRouter);
exports.default = router;
