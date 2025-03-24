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
describe("FragranceService", () => {
    let createStub;
    let findStub;
    let findByIdStub;
    let findOneAndUpdateStub;
    let findByIdAndDeleteStub;
    beforeEach(() => {
        createStub = sinon_1.default.stub(models_1.FragranceModel, "create");
        findStub = sinon_1.default.stub(models_1.FragranceModel, "find");
        findByIdStub = sinon_1.default.stub(models_1.FragranceModel, "findById");
        findOneAndUpdateStub = sinon_1.default.stub(models_1.FragranceModel, "findOneAndUpdate");
        findByIdAndDeleteStub = sinon_1.default.stub(models_1.FragranceModel, "findByIdAndDelete");
    });
    afterEach(() => sinon_1.default.restore());
    describe("create()", () => {
        it("debe crear fragancia con datos válidos", () => __awaiter(void 0, void 0, void 0, function* () {
            const fragranceInput = {
                name: "Lavanda",
                color: "#A020F0",
                price: 20000,
            };
            createStub.resolves(Object.assign(Object.assign({}, fragranceInput), { _id: "123" }));
            const result = yield services_1.fragranceService.create(fragranceInput);
            expect(result).toMatchObject(fragranceInput);
            expect(createStub.calledWith(fragranceInput)).toBeTruthy();
        }));
    });
    describe("update()", () => {
        it("debe actualizar solo color manteniendo otros valores", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateInput = { color: "#00FF00" };
            const originalFragrance = {
                _id: "123",
                name: "Menta",
                color: "#FF0000",
                price: 18000,
            };
            findOneAndUpdateStub.resolves(Object.assign(Object.assign({}, originalFragrance), updateInput));
            const result = yield services_1.fragranceService.update("123", updateInput);
            expect(result === null || result === void 0 ? void 0 : result.color).toBe("#00FF00");
            expect(result === null || result === void 0 ? void 0 : result.name).toBe("Menta");
        }));
    });
    describe("delete()", () => {
        it("debe eliminar una fragancia", () => __awaiter(void 0, void 0, void 0, function* () {
            const fragranceId = "123";
            findByIdAndDeleteStub.resolves({ _id: fragranceId });
            const result = yield services_1.fragranceService.delete(fragranceId);
            expect(result === null || result === void 0 ? void 0 : result._id).toBe(fragranceId);
        }));
    });
    describe("findAll()", () => {
        it("debe retornar todas las fragancias", () => __awaiter(void 0, void 0, void 0, function* () {
            const fragrances = [
                { _id: "123", name: "Lavanda", color: "#A020F0", price: 20000 },
                { _id: "456", name: "Menta", color: "#00FF00", price: 18000 },
            ];
            findStub.resolves(fragrances);
            const result = yield services_1.fragranceService.findAll();
            expect(result).toMatchObject(fragrances);
        }));
    });
    describe("findById()", () => {
        it("debe retornar una fragancia por id", () => __awaiter(void 0, void 0, void 0, function* () {
            const fragranceId = "123";
            const fragrance = {
                _id: fragranceId,
                name: "Lavanda",
                color: "#A020F0",
                price: 20000,
            };
            findByIdStub.resolves(fragrance);
            const result = yield services_1.fragranceService.findById(fragranceId);
            expect(result).toMatchObject(fragrance);
        }));
    });
});
