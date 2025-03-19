import { Request, Response, Router } from "express";
import { userController } from "../controllers";
import { auth, validateSchema, authorize } from "../middlewares";
import { userSchema, loginSchema } from "../schemas";

export const userRouter = Router();

userRouter.get("/", auth, authorize(["admin"]), userController.getAll);
userRouter.post("/", validateSchema(userSchema), userController.create);
userRouter.get("/profile", auth, userController.get);

userRouter.get("/:id", auth, userController.get);
userRouter.put(
  "/:id",
  auth,
  authorize(["admin", "user"]),
  userController.update
);
userRouter.delete("/:id", auth, authorize(["admin"]), userController.delete);
userRouter.post("/login", validateSchema(loginSchema), userController.login);
