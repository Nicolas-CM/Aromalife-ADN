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
describe("CartController", () => {
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
    describe("create()", () => {
        it("debe retornar 400 si ocurre un error", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = { userId: "user123", items: [{ candleId: "candle1", quantity: 2 }] };
            jest.spyOn(services_1.cartService, "create").mockRejectedValue(new Error("Database error"));
            yield controllers_1.cartController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(new Error("Database error"));
        }));
    });
    describe("get()", () => {
        it("debe retornar 404 si carrito no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.cartService, "findById").mockResolvedValue(null);
            yield controllers_1.cartController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Cart with id invalid-id not found" });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.cartService, "findById").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.cartController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(new Error("Unexpected error"));
        }));
    });
    describe("getAll()", () => {
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(services_1.cartService, "findAll").mockRejectedValue(new Error("Database error"));
            yield controllers_1.cartController.getAll(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(new Error("Database error"));
        }));
    });
    describe("update()", () => {
        it("debe retornar 404 si carrito no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            mockReq.body = { items: [{ candleId: "candle1", quantity: 3 }] };
            jest.spyOn(services_1.cartService, "update").mockResolvedValue(null);
            yield controllers_1.cartController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Cart with id invalid-id not found" });
        }));
        it("debe retornar 400 si ocurre un error de validación", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            mockReq.body = { items: [] };
            jest.spyOn(services_1.cartService, "update").mockRejectedValue(new Error("Validation error"));
            yield controllers_1.cartController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(new Error("Validation error"));
        }));
    });
    describe("delete()", () => {
        it("debe retornar 404 si carrito no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.cartService, "delete").mockResolvedValue(null);
            yield controllers_1.cartController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Cart with id invalid-id not found" });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.cartService, "delete").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.cartController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(new Error("Unexpected error"));
        }));
    });
});
