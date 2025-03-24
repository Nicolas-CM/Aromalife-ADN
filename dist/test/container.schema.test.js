"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_schema_1 = require("../schemas/container.schema");
describe("Container Schema", () => {
    it("debe requerir URL de imagen válida", () => {
        const invalidData = {
            name: "Vaso",
            imageUrl: "no-es-url",
            price: 10000,
            height: 10,
            width: 5,
        };
        const result = container_schema_1.containerSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toContain("Invalid URL format");
        }
    });
    it("debe permitir descripción opcional", () => {
        const validData = {
            name: "Vaso Premium",
            imageUrl: "https://example.com/vaso-premium.jpg",
            price: 20000,
            height: 12,
            width: 6,
        };
        expect(() => container_schema_1.containerSchema.parse(validData)).not.toThrow();
    });
    describe("Precio", () => {
        it("debe ser un número", () => {
            const invalidData = {
                name: "Vaso",
                imageUrl: "https://example.com/vaso.jpg",
                price: "10000",
                height: 10,
                width: 5,
            };
            const result = container_schema_1.containerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain("Expected number");
            }
        });
        it("debe ser mayor a 0", () => {
            const invalidData = {
                name: "Vaso",
                imageUrl: "https://example.com/vaso.jpg",
                price: 0,
                height: 10,
                width: 5,
            };
            const result = container_schema_1.containerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain("Price must be a positive number");
            }
        });
    });
});
