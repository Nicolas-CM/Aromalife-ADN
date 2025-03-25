"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const services_1 = require("../services");
describe("ContainerController", () => {
    let mockReq;
    let mockRes;
    beforeEach(() => {
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });
    describe("getAll()", () => {
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(services_1.containerService, "findAll").mockRejectedValue(new Error("Database error"));
            yield controllers_1.containerController.getAll(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("update()", () => {
        it("debe retornar 404 para ID inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.containerService, "update").mockResolvedValue(null);
            yield controllers_1.containerController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Container with id invalid-id not found",
            });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.containerService, "update").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.containerController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("create()", () => {
        it("debe calcular el diámetro automáticamente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = {
                name: "Jarra Grande",
                imageUrl: "https://example.com/jarra.jpg",
                price: 30000,
                height: 30,
                width: 15,
            };
            jest.spyOn(services_1.containerService, "create").mockResolvedValue(Object.assign(Object.assign({}, mockReq.body), { _id: "123", diameter: 22.5 }));
            yield controllers_1.containerController.create(mockReq, mockRes);
            expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ diameter: 22.5 }));
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.containerService, "create").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.containerController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("get()", () => {
        it("debe retornar 404 para ID inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.containerService, "findById").mockResolvedValue(null);
            yield controllers_1.containerController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Container with id invalid-id not found",
            });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.containerService, "findById").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.containerController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("delete()", () => {
        it("debe retornar 404 para ID inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.containerService, "delete").mockResolvedValue(null);
            yield controllers_1.containerController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Container with id invalid-id not found",
            });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.containerService, "delete").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.containerController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
});
