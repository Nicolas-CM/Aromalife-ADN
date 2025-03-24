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
        it("debe retornar 201 al crear carrito", () => __awaiter(void 0, void 0, void 0, function* () {
            const cartData = {
                userId: "user123",
                items: [{ candleId: "candle1", quantity: 2 }],
            };
            mockReq.body = cartData;
            jest.spyOn(services_1.cartService, "create").mockResolvedValue(cartData);
            yield controllers_1.cartController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(cartData);
        }));
    });
    describe("get()", () => {
        it("debe retornar 404 si carrito no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.params = { id: "invalid-id" };
            jest.spyOn(services_1.cartService, "findById").mockResolvedValue(null);
            yield controllers_1.cartController.get(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
        }));
    });
});
