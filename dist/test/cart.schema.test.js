"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_schema_1 = require("../schemas/cart.schema");
describe("Cart Schema", () => {
    it("debe validar estructura correcta", () => {
        const validData = {
            userId: "507f1f77bcf86cd799439011",
            items: [
                {
                    productId: "5ebbe53423b8c7a9d3456789",
                    quantity: 2,
                },
            ],
        };
        expect(() => cart_schema_1.cartSchema.parse(validData)).not.toThrow();
    });
    it("debe rechazar ID de usuario inválido", () => {
        const invalidData = {
            userId: "invalid-id",
            items: [],
        };
        expect(() => cart_schema_1.cartSchema.parse(invalidData)).toThrow("Invalid ObjectId format");
    });
});
