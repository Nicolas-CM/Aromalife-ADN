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
describe("GiftService", () => {
    let createStub;
    let findStub;
    let findByIdStub;
    let findOneAndUpdateStub;
    let findByIdAndDeleteStub;
    beforeEach(() => {
        createStub = sinon_1.default.stub(models_1.GiftModel, "create");
        findStub = sinon_1.default.stub(models_1.GiftModel, "find");
        findByIdStub = sinon_1.default.stub(models_1.GiftModel, "findById");
        findOneAndUpdateStub = sinon_1.default.stub(models_1.GiftModel, "findOneAndUpdate");
        findByIdAndDeleteStub = sinon_1.default.stub(models_1.GiftModel, "findByIdAndDelete");
    });
    afterEach(() => sinon_1.default.restore());
    describe("create()", () => {
        it("debe crear regalo con datos válidos", () => __awaiter(void 0, void 0, void 0, function* () {
            const giftInput = {
                name: "Flores",
                description: "Ramo de flores frescas",
                price: 20000,
                imageUrl: "https://example.com/flores.jpg",
            };
            createStub.resolves(Object.assign(Object.assign({}, giftInput), { _id: "123" }));
            const result = yield services_1.giftService.create(giftInput);
            expect(result).toMatchObject(giftInput);
            expect(createStub.calledWith(giftInput)).toBeTruthy();
        }));
    });
    describe("update()", () => {
        it("debe actualizar solo el precio manteniendo otros valores", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateInput = { price: 25000 };
            const originalGift = {
                _id: "123",
                name: "Flores",
                description: "Ramo de flores frescas",
                price: 20000,
                imageUrl: "https://example.com/flores.jpg",
            };
            findOneAndUpdateStub.resolves(Object.assign(Object.assign({}, originalGift), updateInput));
            const result = yield services_1.giftService.update("123", updateInput);
            expect(result === null || result === void 0 ? void 0 : result.price).toBe(25000);
            expect(result === null || result === void 0 ? void 0 : result.name).toBe("Flores");
        }));
    });
    describe("delete()", () => {
        it("debe eliminar un regalo", () => __awaiter(void 0, void 0, void 0, function* () {
            const giftId = "123";
            findByIdAndDeleteStub.resolves({ _id: giftId });
            const result = yield services_1.giftService.delete(giftId);
            expect(result === null || result === void 0 ? void 0 : result._id).toBe(giftId);
        }));
    });
    describe("findAll()", () => {
        it("debe retornar todos los regalos", () => __awaiter(void 0, void 0, void 0, function* () {
            const gifts = [
                { _id: "123", name: "Flores", price: 20000 },
                { _id: "456", name: "Chocolates", price: 15000 },
            ];
            findStub.resolves(gifts);
            const result = yield services_1.giftService.findAll();
            expect(result).toMatchObject(gifts);
        }));
    });
    describe("findById()", () => {
        it("debe retornar un regalo por id", () => __awaiter(void 0, void 0, void 0, function* () {
            const giftId = "123";
            const gift = {
                _id: giftId,
                name: "Flores",
                description: "Ramo de flores frescas",
                price: 20000,
                imageUrl: "https://example.com/flores.jpg",
            };
            findByIdStub.resolves(gift);
            const result = yield services_1.giftService.findById(giftId);
            expect(result).toMatchObject(gift);
        }));
    });
});
