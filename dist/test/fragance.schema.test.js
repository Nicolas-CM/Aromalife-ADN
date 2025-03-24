"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fragrance_schema_1 = require("../schemas/fragrance.schema");
describe("Fragrance Schema", () => {
    it("debe rechazar precio negativo", () => {
        const invalidData = {
            name: "Error",
            color: "#FF0000",
            price: -100,
        };
        const result = fragrance_schema_1.fragranceSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("positive number");
        }
    });
    it("debe requerir código de color válido", () => {
        const invalidData = {
            name: "Invalido",
            color: "Rojo",
            price: 10000,
        };
        const result = fragrance_schema_1.fragranceSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("Color must be a valid hexadecimal");
        }
    });
    it("debe aceptar datos válidos", () => {
        const validData = {
            name: "Lavanda",
            color: "#A020F0",
            price: 20000,
        };
        const result = fragrance_schema_1.fragranceSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });
});
