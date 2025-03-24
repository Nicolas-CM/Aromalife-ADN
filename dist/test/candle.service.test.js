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
describe("CandleCustomizationService", () => {
    let findByIdStub;
    let createStub;
    let findByIdAndUpdateStub;
    let findByIdAndDeleteStub;
    beforeEach(() => {
        findByIdStub = sinon_1.default.stub(models_1.CandleCustomizationModel, "findById");
        createStub = sinon_1.default.stub(models_1.CandleCustomizationModel, "create");
        findByIdAndUpdateStub = sinon_1.default.stub(models_1.CandleCustomizationModel, "findByIdAndUpdate");
        findByIdAndDeleteStub = sinon_1.default.stub(models_1.CandleCustomizationModel, "findByIdAndDelete");
    });
    afterEach(() => sinon_1.default.restore());
    describe("create()", () => {
        it("debe crear una personalización de vela con datos válidos", () => __awaiter(void 0, void 0, void 0, function* () {
            const candleInput = {
                userId: "user123",
                containerId: "container123",
                fragranceId: "fragrance123",
                customImage: "https://example.com/image.jpg",
            };
            sinon_1.default.stub(models_1.ContainerModel, "findById").resolves({});
            sinon_1.default.stub(models_1.FragranceModel, "findById").resolves({});
            sinon_1.default.stub(models_1.UserModel, "findById").resolves({});
            createStub.resolves(Object.assign(Object.assign({}, candleInput), { _id: "candle123" }));
            const result = yield services_1.candleCustomizationService.create(candleInput);
            expect(result).toHaveProperty("_id", "candle123");
            expect(createStub.calledOnce).toBeTruthy();
        }));
        it("debe lanzar un error si el contenedor no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            const candleInput = {
                userId: "user123",
                containerId: "invalid-container",
                fragranceId: "fragrance123",
                customImage: "https://example.com/image.jpg",
            };
            sinon_1.default.stub(models_1.ContainerModel, "findById").resolves(null);
            yield expect(services_1.candleCustomizationService.create(candleInput)).rejects.toThrow(ReferenceError);
        }));
    });
    describe("findById()", () => {
        it("debe retornar una personalización de vela por id", () => __awaiter(void 0, void 0, void 0, function* () {
            const candle = {
                populate: sinon_1.default.stub().resolvesThis(), // Simula el método populate()
                _id: "candle123",
                containerId: { name: "Vaso Grande" },
                fragranceId: { name: "Lavanda" },
            };
            findByIdStub.resolves(candle);
            const result = yield services_1.candleCustomizationService.findById("candle123");
            expect(result).toMatchObject(candle);
            expect(findByIdStub.calledWith("candle123")).toBeTruthy();
        }));
        it("debe lanzar un error si la personalización no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            findByIdStub.resolves(null);
            yield expect(services_1.candleCustomizationService.findById("invalid-id")).rejects.toThrow(ReferenceError);
        }));
    });
    describe("update()", () => {
        it("debe actualizar una personalización de vela existente", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateData = { customImage: "https://example.com/new-image.jpg" };
            const updatedCandle = Object.assign(Object.assign({}, updateData), { _id: "candle123" });
            findByIdAndUpdateStub.resolves(updatedCandle);
            const result = yield services_1.candleCustomizationService.update("candle123", updateData);
            expect(result).toMatchObject(updatedCandle);
            expect(findByIdAndUpdateStub.calledWith("candle123", updateData, {
                returnOriginal: false,
            })).toBeTruthy();
        }));
        it("debe lanzar un error si la personalización no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            findByIdAndUpdateStub.resolves(null);
            yield expect(services_1.candleCustomizationService.update("invalid-id", {})).rejects.toThrow(ReferenceError);
        }));
    });
    describe("delete()", () => {
        it("debe eliminar una personalización de vela existente", () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedCandle = { _id: "candle123" };
            findByIdAndDeleteStub.resolves(deletedCandle);
            const result = yield services_1.candleCustomizationService.delete("candle123");
            expect(result).toMatchObject(deletedCandle);
            expect(findByIdAndDeleteStub.calledWith("candle123")).toBeTruthy();
        }));
        it("debe lanzar un error si la personalización no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            findByIdAndDeleteStub.resolves(null);
            yield expect(services_1.candleCustomizationService.delete("invalid-id")).rejects.toThrow(ReferenceError);
        }));
    });
});
