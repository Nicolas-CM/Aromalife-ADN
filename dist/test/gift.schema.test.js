"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gift_schema_1 = require("../schemas/gift.schema");
describe("Gift Schema", () => {
    it("debe rechazar precio negativo", () => {
        const invalidData = {
            name: "Error",
            description: "Regalo con precio negativo",
            price: -100,
            imageUrl: "https://example.com/error.jpg",
        };
        const result = gift_schema_1.giftSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("positive number");
        }
    });
    it("debe requerir URL de imagen válida", () => {
        const invalidData = {
            name: "Regalo sin imagen",
            description: "Falta URL de imagen",
            price: 10000,
            imageUrl: "invalid-url",
        };
        const result = gift_schema_1.giftSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("Must be a valid URL");
        }
    });
    it("debe aceptar datos válidos", () => {
        const validData = {
            name: "Oso de Peluche",
            description: "Un oso de peluche suave y tierno",
            price: 25000,
            imageUrl: "https://example.com/oso.jpg",
        };
        const result = gift_schema_1.giftSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });
});
