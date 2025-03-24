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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../routes/user.route");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", user_route_1.userRouter);
describe("User Routes", () => {
    describe("POST /login", () => {
        it("Debería retornar token con credenciales válidas", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(user_service_1.userService, "login").mockResolvedValue({
                user: {
                    id: "123",
                    name: "Test User",
                    email: "test@test.com",
                    roles: ["client"],
                    token: "fake.token",
                    age: 25,
                },
            });
            const response = yield (0, supertest_1.default)(app).post("/users/login").send({
                email: "test@test.com",
                password: "password123",
            });
            expect(response.statusCode).toBe(200);
            expect(response.body.user.token).toBeDefined();
        }));
        it("Debería permitir acceso con token válido", () => __awaiter(void 0, void 0, void 0, function* () {
            jest
                .spyOn(jsonwebtoken_1.default, "verify")
                .mockReturnValue({ user: { roles: ["manager"] } });
            jest.spyOn(user_service_1.userService, "findById").mockResolvedValue({
                _id: "123",
                name: "Test User",
                email: "test@test.com",
                roles: ["manager"],
                age: 25,
                password: "hashedPassword",
            });
            const response = yield (0, supertest_1.default)(app)
                .get("/users/123")
                .set("Authorization", "Bearer valid.token");
            expect(response.statusCode).toBe(200);
        }));
    });
});
