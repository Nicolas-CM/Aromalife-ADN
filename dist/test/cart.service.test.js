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
const mongoose_1 = __importDefault(require("mongoose"));
describe("CartService", () => {
    let existsStub;
    let createStub;
    let findStub;
    let findByIdStub;
    let findOneAndUpdateStub;
    let findByIdAndDeleteStub;
    beforeEach(() => {
        existsStub = sinon_1.default.stub(mongoose_1.default.Model, "exists");
        createStub = sinon_1.default.stub(models_1.CartModel, "create");
        findStub = sinon_1.default.stub(models_1.CartModel, "find");
        findByIdStub = sinon_1.default.stub(models_1.CartModel, "findById");
        findOneAndUpdateStub = sinon_1.default.stub(models_1.CartModel, "findOneAndUpdate");
        findByIdAndDeleteStub = sinon_1.default.stub(models_1.CartModel, "findByIdAndDelete");
    });
    afterEach(() => sinon_1.default.restore());
    describe("create()", () => {
        it("debe crear carrito con usuario y productos válidos", () => __awaiter(void 0, void 0, void 0, function* () {
            const cartInput = {
                userId: new mongoose_1.default.Types.ObjectId().toString(),
                items: [
                    {
                        candleId: new mongoose_1.default.Types.ObjectId().toString(),
                        quantity: 2,
                    },
                ],
            };
            existsStub.withArgs({ _id: cartInput.userId }).resolves(true);
            existsStub.withArgs({ _id: cartInput.items[0].candleId }).resolves(true);
            createStub.resolves(Object.assign(Object.assign({}, cartInput), { _id: "123" }));
            const result = yield services_1.cartService.create(cartInput);
            expect(result).toHaveProperty("_id", "123");
            expect(createStub.calledOnce).toBeTruthy();
        }));
        it("debe lanzar error si usuario no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            const cartInput = {
                userId: "invalid-user-id",
                items: [],
            };
            existsStub.withArgs({ _id: cartInput.userId }).resolves(false);
            yield expect(services_1.cartService.create(cartInput)).rejects.toThrow("User with id invalid-user-id does not exist");
        }));
    });
    describe("update()", () => {
        it("debe actualizar items del carrito", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateInput = {
                items: [
                    {
                        candleId: new mongoose_1.default.Types.ObjectId().toString(),
                        quantity: 3,
                    },
                ],
            };
            existsStub.resolves(true);
            findOneAndUpdateStub.resolves(Object.assign({ _id: "123" }, updateInput));
            const result = yield services_1.cartService.update("123", updateInput);
            expect(result === null || result === void 0 ? void 0 : result.items[0].quantity).toBe(3);
            expect(findOneAndUpdateStub.calledWith({ _id: "123" }, updateInput, {
                returnOriginal: false,
            })).toBeTruthy();
        }));
    });
    // Pruebas similares para findAll, findById, delete
});
