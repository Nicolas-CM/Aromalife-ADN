import { Request, Response, Router } from "express";
import { userController } from "../controllers";
import { auth, validateSchema, authorize } from "../middlewares";
import { userSchema, loginSchema } from "../schemas";

export const userRouter = Router();

userRouter.get("/", auth, authorize(["superadmin"]), userController.getAll);

userRouter.post(
  "/",
  auth,
  authorize(["superadmin"]),
  validateSchema(userSchema),
  userController.create
);

userRouter.get(
  "/profile",
  auth,
  authorize(["superadmin", "manager", "client"]),
  userController.get
);

userRouter.get(
  "/:id",
  auth,
  authorize(["superadmin", "manager"]),
  userController.get
);
userRouter.put("/:id", auth, authorize(["superadmin"]), userController.update);

userRouter.delete(
  "/:id",
  auth,
  authorize(["superadmin"]),
  userController.delete
);

userRouter.post("/login", validateSchema(loginSchema), userController.login);
