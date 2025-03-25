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
const gift_route_1 = require("../routes/gift.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/gifts", gift_route_1.giftRouter);
describe("Gift Routes", () => {
    describe("DELETE /gifts/:id", () => {
        it("debe requerir autenticación JWT", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).delete("/gifts/123").send();
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("GET /gifts", () => {
        it("debe requerir autenticación JWT", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get("/gifts").send();
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("POST /gifts", () => {
        it("debe requerir autenticación JWT", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post("/gifts").send({
                name: "Ramo de Rosas",
                description: "Un hermoso ramo de rosas rojas",
                price: 25000,
                imageUrl: "https://example.com/rosas.jpg",
            });
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("PUT /gifts/:id", () => {
        it("debe requerir autenticación JWT", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).put("/gifts/123").send({
                name: "Caja de Bombones",
                price: 20000,
            });
            expect(response.statusCode).toBe(401);
        }));
    });
});
