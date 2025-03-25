import { Request, Response } from "express";
import { cartController } from "../controllers";
import { cartService } from "../services";

describe("CartController", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("create()", () => {
    it("debe retornar 400 si ocurre un error", async () => {
      mockReq.body = { userId: "user123", items: [{ candleId: "candle1", quantity: 2 }] };
      jest.spyOn(cartService, "create").mockRejectedValue(new Error("Database error"));

      await cartController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("get()", () => {
    it("debe retornar 404 si carrito no existe", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(cartService, "findById").mockResolvedValue(null);

      await cartController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Cart with id invalid-id not found" });
    });

    it("debe retornar 500 si ocurre un error inesperado", async () => {
      mockReq.params = { id: "123" };
      jest.spyOn(cartService, "findById").mockRejectedValue(new Error("Unexpected error"));

      await cartController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Unexpected error"));
    });
  });

  describe("getAll()", () => {
    it("debe retornar 500 si ocurre un error inesperado", async () => {
      jest.spyOn(cartService, "findAll").mockRejectedValue(new Error("Database error"));

      await cartController.getAll(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Database error"));
    });
  });

  describe("update()", () => {
    it("debe retornar 404 si carrito no existe", async () => {
      mockReq.params = { id: "invalid-id" };
      mockReq.body = { items: [{ candleId: "candle1", quantity: 3 }] };
      jest.spyOn(cartService, "update").mockResolvedValue(null);

      await cartController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Cart with id invalid-id not found" });
    });

    it("debe retornar 400 si ocurre un error de validación", async () => {
      mockReq.params = { id: "123" };
      mockReq.body = { items: [] };
      jest.spyOn(cartService, "update").mockRejectedValue(new Error("Validation error"));

      await cartController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Validation error"));
    });
  });

  describe("delete()", () => {
    it("debe retornar 404 si carrito no existe", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(cartService, "delete").mockResolvedValue(null);

      await cartController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Cart with id invalid-id not found" });
    });

    it("debe retornar 500 si ocurre un error inesperado", async () => {
      mockReq.params = { id: "123" };
      jest.spyOn(cartService, "delete").mockRejectedValue(new Error("Unexpected error"));

      await cartController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(new Error("Unexpected error"));
    });
  });
});
