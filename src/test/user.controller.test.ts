import { Request, Response } from "express";
import { userController } from "../controllers";
import { userService } from "../services";
import { AuthError } from "../exceptions";

describe("UserController", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("create()", () => {
    it("Debería retornar 201 al crear usuario exitosamente", async () => {
      mockReq.body = {
        name: "New User",
        email: "new@test.com",
        password: "password123",
        age: 25,
        roles: ["client"],
      };

      const mockUser = {
        _id: "123",
        ...mockReq.body,
        password: "hashedPassword",
      };

      jest.spyOn(userService, "create").mockResolvedValue(mockUser as any);

      await userController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it("Debería retornar 400 si el usuario ya existe", async () => {
      mockReq.body = { email: "exist@test.com" };
      jest.spyOn(userService, "create").mockRejectedValue(new ReferenceError());

      await userController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "User already exists",
      });
    });

    it("Debería retornar 500 en error inesperado", async () => {
      mockReq.body = { email: "error@test.com" };
      jest.spyOn(userService, "create").mockRejectedValue(new Error("Unexpected"));

      await userController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Unexpected"));
    });
  });

  describe("login()", () => {
    it("Debería retornar 200 con token válido", async () => {
      mockReq.body = {
        email: "test@test.com",
        password: "password123",
      };

      const mockResponse = {
        user: {
          id: "123",
          name: "Test User",
          email: "test@test.com",
          roles: ["client"],
          token: "fake.token",
          age: 25,
        },
      };

      jest.spyOn(userService, "login").mockResolvedValue(mockResponse as any);

      await userController.login(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
    });

    it("Debería retornar 401 en credenciales inválidas", async () => {
      mockReq.body = { email: "wrong@test.com", password: "wrong" };
      jest
        .spyOn(userService, "login")
        .mockRejectedValue(new AuthError("Invalid credentials"));

      await userController.login(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("Debería retornar 500 en error inesperado", async () => {
      mockReq.body = { email: "error@test.com", password: "error" };
      jest.spyOn(userService, "login").mockRejectedValue(new Error("Unexpected"));

      await userController.login(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Unexpected"));
    });
  });

  describe("delete()", () => {
    it("Debería retornar 404 al eliminar usuario que no existe", async () => {
      mockReq.params = { id: "user123" };
      jest.spyOn(userService, "delete").mockResolvedValue(null);

      await userController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "User with id user123 not found",
      });
    });

    it("Debería retornar 500 en error inesperado", async () => {
      mockReq.params = { id: "user123" };
      jest.spyOn(userService, "delete").mockRejectedValue(new Error("Unexpected"));

      await userController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Unexpected"));
    });
  });
});
