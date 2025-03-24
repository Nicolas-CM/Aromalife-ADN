import request from "supertest";
import express from "express";
import { userRouter } from "../routes/user.route";
import jwt from "jsonwebtoken";
import { userService } from "../services/user.service";
import { AuthError } from "../exceptions";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("User Routes", () => {
  describe("POST /login", () => {
    it("Debería retornar token con credenciales válidas", async () => {
      jest.spyOn(userService, "login").mockResolvedValue({
        user: {
          id: "123",
          name: "Test User",
          email: "test@test.com",
          roles: ["client"],
          token: "fake.token",
          age: 25,
        },
      });

      const response = await request(app).post("/users/login").send({
        email: "test@test.com",
        password: "password123",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.user.token).toBeDefined();
    });

    it("Debería permitir acceso con token válido", async () => {
      jest
        .spyOn(jwt, "verify")
        .mockReturnValue({ user: { roles: ["manager"] } } as any);
      jest.spyOn(userService, "findById").mockResolvedValue({
        _id: "123",
        name: "Test User",
        email: "test@test.com",
        roles: ["manager"],
        age: 25,
        password: "hashedPassword",
      } as any);

      const response = await request(app)
        .get("/users/123")
        .set("Authorization", "Bearer valid.token");

      expect(response.statusCode).toBe(200);
    });
  });
});
