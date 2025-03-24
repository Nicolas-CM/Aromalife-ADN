"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
describe("Zod Schemas", () => {
    describe("User Schema", () => {
        it("Debería rechazar falta de nombre", () => {
            const invalidUser = {
                email: "test@test.com",
                password: "password123",
                age: 25,
                roles: ["client"],
            };
            const result = schemas_1.userSchema.safeParse(invalidUser);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].path).toEqual(["name"]);
            }
        });
        it("Debería validar contraseña mínima de 8 caracteres", () => {
            const invalidUser = {
                name: "Test",
                email: "test@test.com",
                password: "short",
                age: 25,
                roles: ["client"],
            };
            const result = schemas_1.userSchema.safeParse(invalidUser);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message);
            }
        });
    });
    describe("Login Schema", () => {
        it("Debería requerir email válido", () => {
            const invalidLogin = {
                email: "invalid",
                password: "password123",
            };
            const result = schemas_1.loginSchema.safeParse(invalidLogin);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain("email");
            }
        });
    });
});
