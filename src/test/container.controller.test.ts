import { Request, Response } from "express";
import { containerController } from "../controllers";
import { containerService } from "../services";

describe("ContainerController", () => {
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
    it("debe calcular el diámetro automáticamente", async () => {
      mockReq.body = {
        name: "Jarra Grande",
        imageUrl: "https://example.com/jarra.jpg",
        price: 30000,
        height: 30,
        width: 15,
      };

      jest.spyOn(containerService, "create").mockResolvedValue({
        ...mockReq.body,
        _id: "123",
        diameter: 22.5,
      } as any);

      await containerController.create(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({ diameter: 22.5 })
      );
    });
  });

  describe("get()", () => {
    it("debe retornar 404 para ID inexistente", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(containerService, "findById").mockResolvedValue(null);

      await containerController.get(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Container with id invalid-id not found",
      });
    });
  });
  describe("delete()", () => {
    it("debe retornar 404 para ID inexistente", async () => {
      mockReq.params = { id: "invalid-id" };
      jest.spyOn(containerService, "delete").mockResolvedValue(null);

      await containerController.delete(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Container with id invalid-id not found",
      });
    });
  });
});
