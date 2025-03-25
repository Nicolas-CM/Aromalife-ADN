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
const candle_route_1 = require("../routes/candle.route");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/customizations", candle_route_1.candleRouter);
jest.spyOn(jsonwebtoken_1.default, "verify").mockImplementation((token) => {
    if (token === "valid.role.token")
        return { roles: ["superadmin"] };
    if (token === "invalid.role.token")
        return { roles: ["client"] };
    throw new Error("Invalid token");
});
describe("CandleCustomization Routes", () => {
    describe("POST /customizations", () => {
        it("debe requerir autenticación", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post("/customizations").send({});
            expect(response.statusCode).toBe(401);
        }));
        it("debe requerir rol superadmin", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .delete("/customizations/641a9f0b2f7b88a9b8e7c999")
                .set("Authorization", "Bearer invalid.role.token");
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("PUT /customizations/:id", () => {
        it("debe requerir autenticación", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).put("/customizations/1");
            expect(response.statusCode).toBe(401);
        }));
        it("debe requerir rol superadmin", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .put("/customizations/641a9f0b2f7b88a9b8e7c999")
                .set("Authorization", "Bearer invalid.role.token");
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("GET /customizations/:id", () => {
        it("debe requerir autenticación", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get("/customizations/1");
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("DELETE /customizations/:id", () => {
        it("debe requerir autenticación", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).delete("/customizations/1");
            expect(response.statusCode).toBe(401);
        }));
        it("debe requerir rol superadmin", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .delete("/customizations/641a9f0b2f7b88a9b8e7c999")
                .set("Authorization", "Bearer invalid.role.token");
            expect(response.statusCode).toBe(401);
        }));
    });
});
