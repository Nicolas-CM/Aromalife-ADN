import { Request, Response } from "express";
import { candleCustomizationController } from "../controllers";
import { candleCustomizationService } from "../services";

describe("CandleCustomizationController", () => {
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

    it("debe retornar 400 si la personalización ya existe", async () => {
      mockReq.body = { name: "Vela Aromática", scent: "Lavanda", color: "#FF5733" };
      jest.spyOn(candleCustomizationService, "create").mockRejectedValue(new ReferenceError());

      await candleCustomizationController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization already exists" });
    });

    it("debe retornar 500 si ocurre un error inesperado", async () => {
      jest.spyOn(candleCustomizationService, "create").mockRejectedValue(new Error("Unexpected error"));

      await candleCustomizationController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe("get()", () => {
    it("debe retornar 404 para ID inexistente", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(candleCustomizationService, "findById").mockResolvedValue(null);

      await candleCustomizationController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization with id invalid-id not found" });
    });

    it("debe retornar 500 si ocurre un error inesperado", async () => {
      mockReq.params = { id: "123" };
      jest.spyOn(candleCustomizationService, "findById").mockRejectedValue(new Error("Database error"));

      await candleCustomizationController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe("update()", () => {
    it("debe retornar 404 para ID inexistente", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(candleCustomizationService, "update").mockResolvedValue(null);

      await candleCustomizationController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization with id invalid-id not found" });
    });

    it("debe retornar 500 si ocurre un error inesperado", async () => {
      mockReq.params = { id: "123" };
      jest.spyOn(candleCustomizationService, "update").mockRejectedValue(new Error("Unexpected error"));

      await candleCustomizationController.update(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe("delete()", () => {
    it("debe retornar 404 para ID inexistente", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(candleCustomizationService, "delete").mockResolvedValue(null);

      await candleCustomizationController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization with id invalid-id not found" });
    });

    it("debe retornar 500 si ocurre un error inesperado", async () => {
      mockReq.params = { id: "123" };
      jest.spyOn(candleCustomizationService, "delete").mockRejectedValue(new Error("Unexpected error"));

      await candleCustomizationController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe("getAll()", () => {
    it("debe retornar 500 si ocurre un error inesperado", async () => {
      jest.spyOn(candleCustomizationService, "findAll").mockRejectedValue(new Error("Database error"));

      await candleCustomizationController.getAll(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
});