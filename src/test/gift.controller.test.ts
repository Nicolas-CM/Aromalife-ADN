import { Request, Response } from "express";
import { giftController } from "../controllers";
import { giftService } from "../services";

describe("GiftController", () => {
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
    it("debe retornar 400 si el regalo ya existe", async () => {
      mockReq.body = { name: "Flores", price: 20000 };
      jest.spyOn(giftService, "create").mockRejectedValue(new ReferenceError());

      await giftController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("get()", () => {
    it("debe retornar 404 si no se encuentra el regalo", async () => {
      mockReq.params = { id: "123" };
      jest.spyOn(giftService, "findById").mockResolvedValue(null);

      await giftController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe("update()", () => {
    it("debe retornar 404 si no existe el regalo", async () => {
      mockReq.params = { id: "123" };
      mockReq.body = { price: 25000 };

      jest.spyOn(giftService, "update").mockResolvedValue(null);

      await giftController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it("debe manejar error del servicio y retornar 500", async () => {
      mockReq.params = { id: "123" };
      mockReq.body = { price: 25000 };

      jest.spyOn(giftService, "update").mockRejectedValue(new Error("Service error"));

      await giftController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe("delete()", () => {
    it("debe retornar 404 si no existe el regalo", async () => {
      mockReq.params = { id: "123" };

      jest.spyOn(giftService, "delete").mockResolvedValue(null);

      await giftController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it("debe manejar error del servicio y retornar 500", async () => {
      mockReq.params = { id: "123" };

      jest.spyOn(giftService, "delete").mockRejectedValue(new Error("Service error"));

      await giftController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe("getAll()", () => {
    it("debe manejar error de base de datos", async () => {
      jest
        .spyOn(giftService, "findAll")
        .mockRejectedValue(new Error("Database connection failed"));

      await giftController.getAll(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
});