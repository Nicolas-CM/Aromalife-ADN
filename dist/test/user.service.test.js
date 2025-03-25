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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const models_1 = require("../models");
const services_1 = require("../services");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("../exceptions");
const mongoose_1 = __importDefault(require("mongoose"));
describe("UserService", () => {
    process.env.JWT_SECRET = "test_secret";
    let findOneStub;
    let createStub;
    let compareStub;
    let hashStub;
    let signStub;
    beforeEach(() => {
        findOneStub = sinon_1.default.stub(models_1.UserModel, "findOne");
        createStub = sinon_1.default.stub(models_1.UserModel, "create");
        compareStub = sinon_1.default.stub(bcrypt_1.default, "compare");
        hashStub = sinon_1.default.stub(bcrypt_1.default, "hash");
        signStub = sinon_1.default.stub(jsonwebtoken_1.default, "sign");
    });
    afterEach(() => {
        sinon_1.default.restore();
    });
    describe("create()", () => {
        it("Debería crear usuario con contraseña encriptada", () => __awaiter(void 0, void 0, void 0, function* () {
            const userInput = {
                name: "Test User",
                email: "test@test.com",
                password: "password123",
                age: 25,
                roles: ["client"],
            };
            hashStub.resolves("hashedPassword");
            createStub.resolves(Object.assign(Object.assign({}, userInput), { _id: new mongoose_1.default.Types.ObjectId(), password: "hashedPassword" }));
            const result = yield services_1.userService.create(userInput);
            expect(hashStub.calledWith("password123", 10)).toBeTruthy();
            expect(createStub.calledWith(sinon_1.default.match({ password: "hashedPassword" }))).toBeTruthy();
            expect(result.password).toBe("hashedPassword");
        }));
        it("Debería lanzar error si el email ya existe", () => __awaiter(void 0, void 0, void 0, function* () {
            const userInput = {
                email: "exist@test.com",
                password: "password123",
                name: "Test",
                age: 30,
                roles: ["client"],
            };
            findOneStub.resolves({ email: "exist@test.com" });
            yield expect(services_1.userService.create(userInput)).rejects.toThrow(ReferenceError);
        }));
        it("Debería manejar error de base de datos", () => __awaiter(void 0, void 0, void 0, function* () {
            const userInput = {
                email: "test@test.com",
                password: "password123",
                name: "Test",
                age: 30,
                roles: ["client"],
            };
            createStub.rejects(new Error("Database connection failed"));
            yield expect(services_1.userService.create(userInput)).rejects.toThrow("Database connection failed");
        }));
    });
    describe("login()", () => {
        it("Debería generar token JWT válido", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = {
                _id: new mongoose_1.default.Types.ObjectId(),
                email: "test@test.com",
                password: yield bcrypt_1.default.hash("password123", 10),
                name: "Test User",
                age: 25,
                roles: ["client"],
            };
            findOneStub.resolves(mockUser);
            compareStub.resolves(true);
            signStub.returns("fake.jwt.token");
            const result = yield services_1.userService.login({
                email: "test@test.com",
                password: "password123",
            });
            expect(signStub.calledWith(sinon_1.default.match({
                user: {
                    email: mockUser.email,
                    name: mockUser.name,
                    roles: mockUser.roles,
                },
            }), process.env.JWT_SECRET, sinon_1.default.match({ expiresIn: "10m" }))).toBeTruthy();
            expect(result === null || result === void 0 ? void 0 : result.user.token).toBe("fake.jwt.token");
        }));
        it("Debería lanzar error con credenciales incorrectas", () => __awaiter(void 0, void 0, void 0, function* () {
            findOneStub.resolves(null);
            yield expect(services_1.userService.login({
                email: "wrong@test.com",
                password: "wrong",
            })).rejects.toThrow(exceptions_1.AuthError);
        }));
        it("Debería lanzar error si la contraseña es incorrecta", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = {
                email: "test@test.com",
                password: yield bcrypt_1.default.hash("password123", 10),
            };
            findOneStub.resolves(mockUser);
            compareStub.resolves(false);
            yield expect(services_1.userService.login({
                email: "test@test.com",
                password: "wrongpassword",
            })).rejects.toThrow(exceptions_1.AuthError);
        }));
        it("Debería manejar error inesperado en findOne", () => __awaiter(void 0, void 0, void 0, function* () {
            findOneStub.rejects(new Error("Unexpected error"));
            yield expect(services_1.userService.login({
                email: "test@test.com",
                password: "password123",
            })).rejects.toThrow("Unexpected error");
        }));
    });
    describe("findById()", () => {
        it("Debería retornar el usuario si se encuentra", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = {
                _id: "123",
                email: "test@test.com",
                name: "Test User",
            };
            findOneStub.resolves(mockUser);
            const result = yield services_1.userService.findById("123");
            expect(findOneStub.calledWith({ _id: "123" })).toBeTruthy();
            expect(result).toMatchObject(mockUser);
        }));
        it("Debería retornar null si no se encuentra el usuario", () => __awaiter(void 0, void 0, void 0, function* () {
            findOneStub.resolves(null);
            const result = yield services_1.userService.findById("invalid-id");
            expect(findOneStub.calledWith({ _id: "invalid-id" })).toBeTruthy();
            expect(result).toBeNull();
        }));
        it("Debería manejar error inesperado en findOne", () => __awaiter(void 0, void 0, void 0, function* () {
            findOneStub.rejects(new Error("Unexpected error"));
            yield expect(services_1.userService.findById("123")).rejects.toThrow("Unexpected error");
        }));
    });
});
