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

  describe("create()", () => {

    it("debe retornar 400 si la fragancia ya existe", async () => {
      mockReq.body = { name: "Lavender", color: "#00FF00" };
      jest.spyOn(fragranceService, "create").mockRejectedValue(new ReferenceError());

      await fragranceController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
    });
  });

  describe("get()", () => {
   

    it("debe retornar 404 si no se encuentra la fragancia", async () => {
      mockReq.params = { id: "123" };
      jest.spyOn(fragranceService, "findById").mockResolvedValue(null);

      await fragranceController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });

  describe("update()", () => {
    it("debe retornar 404 si no existe la fragancia", async () => {
      mockReq.params = { id: "123" };
      mockReq.body = { color: "#00FF00" };

      jest.spyOn(fragranceService, "update").mockResolvedValue(null);

      await fragranceController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it("debe manejar error del servicio y retornar 500", async () => {
      mockReq.params = { id: "123" };
      mockReq.body = { color: "#00FF00" };

      jest.spyOn(fragranceService, "update").mockRejectedValue(new Error("Service error"));

      await fragranceController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe("delete()", () => {
    it("debe retornar 404 si no existe la fragancia", async () => {
      mockReq.params = { id: "123" };

      jest.spyOn(fragranceService, "delete").mockResolvedValue(null);

      await fragranceController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });

    it("debe manejar error del servicio y retornar 500", async () => {
      mockReq.params = { id: "123" };

      jest.spyOn(fragranceService, "delete").mockRejectedValue(new Error("Service error"));

      await fragranceController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
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
