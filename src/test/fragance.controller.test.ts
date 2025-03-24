import { Request, Response } from "express";
import { fragranceController } from "../controllers";
import { fragranceService } from "../services";

describe("FragranceController", () => {
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

  describe("update()", () => {
    it("debe retornar 404 si no existe la fragancia", async () => {
      mockReq.params = { id: "123" };
      mockReq.body = { color: "#00FF00" };

      jest.spyOn(fragranceService, "update").mockResolvedValue(null);

      await fragranceController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe("delete()", () => {
    it("debe retornar 404 si no existe la fragancia", async () => {
      mockReq.params = { id: "123" };

      jest.spyOn(fragranceService, "delete").mockResolvedValue(null);

      await fragranceController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe("getAll()", () => {
    it("debe manejar error de base de datos", async () => {
      jest
        .spyOn(fragranceService, "findAll")
        .mockRejectedValue(new Error("Database connection failed"));

      await fragranceController.getAll(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
});
