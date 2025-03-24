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
    it("debe retornar 201 al crear carrito", async () => {
      const cartData = {
        userId: "user123",
        items: [{ candleId: "candle1", quantity: 2 }],
      };

      mockReq.body = cartData;
      jest.spyOn(cartService, "create").mockResolvedValue(cartData as any);

      await cartController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(cartData);
    });
  });

  describe("get()", () => {
    it("debe retornar 404 si carrito no existe", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(cartService, "findById").mockResolvedValue(null);

      await cartController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe("delete()", () => {
    it("debe retornar 404 al eliminar carrito que no existe", async () => {
      mockReq.params = { id: "cart123" };
      jest.spyOn(cartService, "delete").mockResolvedValue(null);

      await cartController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});
