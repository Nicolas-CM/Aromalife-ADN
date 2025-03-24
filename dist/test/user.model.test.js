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
const models_1 = require("../models");
describe("UserModel", () => {
    it("Debería requerir campos obligatorios", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new models_1.UserModel();
        const error = user.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.name).toBeDefined();
        expect(error === null || error === void 0 ? void 0 : error.errors.email).toBeDefined();
        expect(error === null || error === void 0 ? void 0 : error.errors.password).toBeDefined();
        expect(error === null || error === void 0 ? void 0 : error.errors.age).toBeDefined();
    }));
    it("Debería permitir la creación de un usuario válido", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new models_1.UserModel({
            name: "Test User",
            email: "test@test.com",
            password: "password123",
            age: 30,
            roles: ["client"],
        });
        const error = user.validateSync();
        expect(error).toBeUndefined(); // No debe haber errores
    }));
    it("Debería aceptar un usuario sin roles (opcional)", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new models_1.UserModel({
            name: "Test User",
            email: "test@test.com",
            password: "password123",
            age: 30,
        });
        const error = user.validateSync();
        expect(error).toBeUndefined();
    }));
    it("Debería aceptar múltiples roles permitidos", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new models_1.UserModel({
            name: "Test User",
            email: "test@test.com",
            password: "password123",
            age: 30,
            roles: ["client", "manager"],
        });
        const error = user.validateSync();
        expect(error).toBeUndefined();
    }));
    it("Debería rechazar una edad no numérica", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new models_1.UserModel({
            name: "Test User",
            email: "test@test.com",
            password: "password123",
            age: "not-a-number", // Edad inválida
            roles: ["client"],
        });
        const error = user.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.age).toBeDefined();
    }));
    it("Debería rechazar un usuario sin email", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = new models_1.UserModel({
            name: "Test User",
            password: "password123",
            age: 30,
            roles: ["client"],
        });
        const error = user.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.email).toBeDefined();
    }));
});
