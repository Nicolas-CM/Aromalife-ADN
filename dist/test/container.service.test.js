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
describe("ContainerService", () => {
    let createStub;
    let findStub;
    let findByIdStub;
    let findOneAndUpdateStub;
    let findByIdAndDeleteStub;
    beforeEach(() => {
        createStub = sinon_1.default.stub(models_1.ContainerModel, "create");
        findStub = sinon_1.default.stub(models_1.ContainerModel, "find");
        findByIdStub = sinon_1.default.stub(models_1.ContainerModel, "findById");
        findOneAndUpdateStub = sinon_1.default.stub(models_1.ContainerModel, "findOneAndUpdate");
        findByIdAndDeleteStub = sinon_1.default.stub(models_1.ContainerModel, "findByIdAndDelete");
    });
    afterEach(() => sinon_1.default.restore());
    describe("create()", () => {
        it("debe crear un contenedor con datos válidos", () => __awaiter(void 0, void 0, void 0, function* () {
            const containerInput = {
                name: "Vaso Tradicional",
                imageUrl: "https://example.com/vaso.jpg",
                price: 15000,
                height: 20,
                width: 10,
            };
            createStub.resolves(Object.assign(Object.assign({}, containerInput), { _id: "123", diameter: 15 }));
            const result = yield services_1.containerService.create(containerInput);
            expect(result).toMatchObject(Object.assign(Object.assign({}, containerInput), { diameter: 15 }));
            expect(createStub.calledWith(containerInput)).toBeTruthy();
        }));
    });
    describe("update()", () => {
        it("debe actualizar solo campos permitidos", () => __awaiter(void 0, void 0, void 0, function* () {
            const updateInput = {
                price: 20000,
                description: "Nueva descripción",
            };
            findOneAndUpdateStub.resolves(Object.assign(Object.assign({ _id: "123" }, updateInput), { name: "Vaso Tradicional" }));
            const result = yield services_1.containerService.update("123", updateInput);
            expect(result === null || result === void 0 ? void 0 : result.price).toBe(20000);
            expect(findOneAndUpdateStub.calledWith({ _id: "123" }, updateInput, {
                returnOriginal: false,
            })).toBeTruthy();
        }));
        it("debe retornar null si no se encuentra el contenedor", () => __awaiter(void 0, void 0, void 0, function* () {
            findOneAndUpdateStub.resolves(null);
            const result = yield services_1.containerService.update("invalid-id", {});
            expect(result).toBeNull();
        }));
    });
    describe("delete()", () => {
        it("debe eliminar un contenedor existente", () => __awaiter(void 0, void 0, void 0, function* () {
            findByIdAndDeleteStub.resolves({
                _id: "123",
                name: "Vaso Tradicional",
                imageUrl: "https://example.com/vaso.jpg",
                price: 15000,
                height: 20,
                width: 10,
            });
            const result = yield services_1.containerService.delete("123");
            expect(result).toMatchObject({
                _id: "123",
                name: "Vaso Tradicional",
                imageUrl: "https://example.com/vaso.jpg",
                price: 15000,
                height: 20,
                width: 10,
            });
            expect(findByIdAndDeleteStub.calledWith("123")).toBeTruthy();
        }));
        it("debe retornar null si no se encuentra el contenedor", () => __awaiter(void 0, void 0, void 0, function* () {
            findByIdAndDeleteStub.resolves(null);
            const result = yield services_1.containerService.delete("invalid-id");
            expect(result).toBeNull();
        }));
    });
    describe("get()", () => {
        it("debe retornar todos los contenedores", () => __awaiter(void 0, void 0, void 0, function* () {
            const containers = [
                {
                    _id: "123",
                    name: "Vaso Tradicional",
                    imageUrl: "https://example.com/vaso.jpg",
                    price: 15000,
                    height: 20,
                    width: 10,
                },
                {
                    _id: "456",
                    name: "Vaso Moderno",
                    imageUrl: "https://example.com/vaso-moderno.jpg",
                    price: 20000,
                    height: 25,
                    width: 15,
                },
            ];
            findStub.resolves(containers);
            const result = yield services_1.containerService.findAll();
            expect(result).toMatchObject(containers);
            expect(findStub.calledOnce).toBeTruthy();
        }));
        it("debe retornar un contenedor por id", () => __awaiter(void 0, void 0, void 0, function* () {
            const container = {
                _id: "123",
                name: "Vaso Tradicional",
                imageUrl: "https://example.com/vaso.jpg",
                price: 15000,
                height: 20,
                width: 10,
            };
            findByIdStub.resolves(container);
            const result = yield services_1.containerService.findById("123");
            expect(result).toMatchObject(container);
            expect(findByIdStub.calledWith("123")).toBeTruthy();
        }));
        it("debe retornar null si no se encuentra el contenedor", () => __awaiter(void 0, void 0, void 0, function* () {
            findByIdStub.resolves(null);
            const result = yield services_1.containerService.findById("invalid-id");
            expect(result).toBeNull();
        }));
    });
});
