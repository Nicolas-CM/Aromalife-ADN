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
describe("CandleCustomizationController", () => {
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
        it("debe retornar 400 si la personalización ya existe", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = { name: "Vela Aromática", scent: "Lavanda", color: "#FF5733" };
            jest.spyOn(services_1.candleCustomizationService, "create").mockRejectedValue(new ReferenceError());
            yield controllers_1.candleCustomizationController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization already exists" });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(services_1.candleCustomizationService, "create").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.candleCustomizationController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("get()", () => {
        it("debe retornar 404 para ID inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.candleCustomizationService, "findById").mockResolvedValue(null);
            yield controllers_1.candleCustomizationController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization with id invalid-id not found" });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.candleCustomizationService, "findById").mockRejectedValue(new Error("Database error"));
            yield controllers_1.candleCustomizationController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("update()", () => {
        it("debe retornar 404 para ID inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.candleCustomizationService, "update").mockResolvedValue(null);
            yield controllers_1.candleCustomizationController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization with id invalid-id not found" });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.candleCustomizationService, "update").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.candleCustomizationController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("delete()", () => {
        it("debe retornar 404 para ID inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.candleCustomizationService, "delete").mockResolvedValue(null);
            yield controllers_1.candleCustomizationController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Customization with id invalid-id not found" });
        }));
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.candleCustomizationService, "delete").mockRejectedValue(new Error("Unexpected error"));
            yield controllers_1.candleCustomizationController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("getAll()", () => {
        it("debe retornar 500 si ocurre un error inesperado", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(services_1.candleCustomizationService, "findAll").mockRejectedValue(new Error("Database error"));
            yield controllers_1.candleCustomizationController.getAll(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
});
