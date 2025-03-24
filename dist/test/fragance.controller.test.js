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
    describe("update()", () => {
        it("debe retornar 404 si no existe la fragancia", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            mockReq.body = { color: "#00FF00" };
            jest.spyOn(services_1.fragranceService, "update").mockResolvedValue(null);
            yield controllers_1.fragranceController.update(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
        }));
    });
    describe("delete()", () => {
        it("debe retornar 404 si no existe la fragancia", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "123" };
            jest.spyOn(services_1.fragranceService, "delete").mockResolvedValue(null);
            yield controllers_1.fragranceController.delete(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
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
