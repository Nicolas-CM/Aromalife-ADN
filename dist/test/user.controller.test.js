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
const exceptions_1 = require("../exceptions");
describe("UserController", () => {
    let mockReq;
    let mockRes;
    let mockNext;
    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        mockNext = jest.fn();
    });
    describe("create()", () => {
        it("Debería retornar 201 al crear usuario exitosamente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = {
                name: "New User",
                email: "new@test.com",
                password: "password123",
                age: 25,
                roles: ["client"],
            };
            const mockUser = Object.assign(Object.assign({ _id: "123" }, mockReq.body), { password: "hashedPassword" });
            jest.spyOn(services_1.userService, "create").mockResolvedValue(mockUser);
            yield controllers_1.userController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(mockUser);
        }));
        it("Debería retornar 400 si el usuario ya existe", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = { email: "exist@test.com" };
            jest.spyOn(services_1.userService, "create").mockRejectedValue(new ReferenceError());
            yield controllers_1.userController.create(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "User already exists",
            });
        }));
    });
    describe("login()", () => {
        it("Debería retornar 200 con token válido", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = {
                email: "test@test.com",
                password: "password123",
            };
            const mockResponse = {
                user: {
                    id: "123",
                    name: "Test User",
                    email: "test@test.com",
                    roles: ["client"],
                    token: "fake.token",
                    age: 25,
                },
            };
            jest.spyOn(services_1.userService, "login").mockResolvedValue(mockResponse);
            yield controllers_1.userController.login(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockResponse);
        }));
        it("Debería retornar 401 en credenciales inválidas", () => __awaiter(void 0, void 0, void 0, function* () {
            mockReq.body = { email: "wrong@test.com", password: "wrong" };
            jest
                .spyOn(services_1.userService, "login")
                .mockRejectedValue(new exceptions_1.AuthError("Invalid credentials"));
            yield controllers_1.userController.login(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Not Authorized" });
        }));
    });
});
