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
const cart_model_1 = require("../models/cart.model");
describe("Cart Model", () => {
    it("debe requerir userId", () => __awaiter(void 0, void 0, void 0, function* () {
        const cart = new cart_model_1.CartModel({
            items: [{ productId: "prod123", quantity: 1 }],
        });
        const error = cart.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.userId).toBeDefined();
    }));
    it("debe validar cantidad mínima", () => __awaiter(void 0, void 0, void 0, function* () {
        const cart = new cart_model_1.CartModel({
            userId: "user123",
            items: [{ productId: "prod123", quantity: 0 }],
        });
        const error = cart.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors["items.0.quantity"]).toBeDefined();
    }));
});
