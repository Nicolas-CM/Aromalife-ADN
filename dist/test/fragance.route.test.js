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
const fragrance_route_1 = require("../routes/fragrance.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/fragrances", fragrance_route_1.fragranceRouter);
describe("Fragrance Routes", () => {
    describe("DELETE /fragrances/:id", () => {
        it("debe requerir autenticación JWT", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).delete("/fragrances/123").send();
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("GET /fragrances", () => {
        it("debe requerir autenticación JWT", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get("/fragrances").send();
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("POST /fragrances", () => {
        it("debe requerir autenticación JWT", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post("/fragrances").send({
                name: "Menta",
                color: "#00FF00",
                price: 18000,
            });
            expect(response.statusCode).toBe(401);
        }));
    });
});
