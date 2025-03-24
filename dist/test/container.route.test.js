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
const container_route_1 = require("../routes/container.route");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/containers", container_route_1.containerRouter);
describe("Container Routes", () => {
    describe("POST /containers", () => {
        it("debe requerir rol superadmin", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(jsonwebtoken_1.default, "verify").mockReturnValue({ roles: ["manager"] });
            const response = yield (0, supertest_1.default)(app)
                .post("/containers")
                .set("Authorization", "Bearer invalid.role.token")
                .send({
                name: "Vaso",
                imageUrl: "https://example.com/vaso.jpg",
                price: 10000,
                height: 10,
                width: 5,
            });
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("PUT /containers/:id", () => {
        it("debe requerir rol superadmin", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(jsonwebtoken_1.default, "verify").mockReturnValue({ roles: ["manager"] });
            const response = yield (0, supertest_1.default)(app)
                .put("/containers/123")
                .set("Authorization", "Bearer invalid.role.token")
                .send({
                name: "Vaso",
                imageUrl: "https://example.com/vaso.jpg",
                price: 10000,
                height: 10,
                width: 5,
            });
            expect(response.statusCode).toBe(401);
        }));
    });
    describe("DELETE /containers/:id", () => {
        it("debe requerir rol superadmin", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(jsonwebtoken_1.default, "verify").mockReturnValue({ roles: ["manager"] });
            const response = yield (0, supertest_1.default)(app)
                .delete("/containers/123")
                .set("Authorization", "Bearer invalid.role.token");
            expect(response.statusCode).toBe(401);
        }));
    });
});
