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
const cart_route_1 = require("../routes/cart.route");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/carts", cart_route_1.cartRouter);
describe("Cart Routes", () => {
    describe("POST /carts", () => {
        it("debe requerir autenticación", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post("/carts").send({});
            expect(response.statusCode).toBe(401);
        }));
        it("debe validar esquema con token válido", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(jsonwebtoken_1.default, "verify").mockReturnValue({ user: {
                    id: "testUserId",
                    roles: ["superadmin"],
                }, });
            const response = yield (0, supertest_1.default)(app)
                .post("/carts")
                .set("Authorization", "Bearer valid.token")
                .send({ userId: "validUserId", items: [{ candleId: "validCandleId" }] });
            expect(response.statusCode).toBe(400);
        }));
    });
});
