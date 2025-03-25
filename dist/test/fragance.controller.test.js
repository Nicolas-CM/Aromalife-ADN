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
describe("FragranceController", () => {
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
        it("debe retornar 400 si la fragancia ya existe", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = { name: "Lavender", color: "#00FF00" };
            jest.spyOn(services_1.fragranceService, "create").mockRejectedValue(new ReferenceError());
            yield controllers_1.fragranceController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
        }));
    });
    describe("get()", () => {
        it("debe retornar 404 si no se encuentra la fragancia", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.fragranceService, "findById").mockResolvedValue(null);
            yield controllers_1.fragranceController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
        }));
    });
    describe("update()", () => {
        it("debe retornar 404 si no existe la fragancia", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            mockReq.body = { color: "#00FF00" };
            jest.spyOn(services_1.fragranceService, "update").mockResolvedValue(null);
            yield controllers_1.fragranceController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
        }));
        it("debe manejar error del servicio y retornar 500", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            mockReq.body = { color: "#00FF00" };
            jest.spyOn(services_1.fragranceService, "update").mockRejectedValue(new Error("Service error"));
            yield controllers_1.fragranceController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("delete()", () => {
        it("debe retornar 404 si no existe la fragancia", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.fragranceService, "delete").mockResolvedValue(null);
            yield controllers_1.fragranceController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
        }));
        it("debe manejar error del servicio y retornar 500", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.fragranceService, "delete").mockRejectedValue(new Error("Service error"));
            yield controllers_1.fragranceController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
    describe("getAll()", () => {
        it("debe manejar error de base de datos", () => __awaiter(void 0, void 0, void 0, function* () {
            jest
                .spyOn(services_1.fragranceService, "findAll")
                .mockRejectedValue(new Error("Database connection failed"));
            yield controllers_1.fragranceController.getAll(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(500);
        }));
    });
});
