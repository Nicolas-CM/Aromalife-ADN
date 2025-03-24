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
Object.defineProperty(exports, "__esModule", { value: true });
const container_model_1 = require("../models/container.model");
describe("Container Model", () => {
    it("debe requerir precio positivo", () => __awaiter(void 0, void 0, void 0, function* () {
        const container = new container_model_1.ContainerModel({
            name: "Vaso",
            imageUrl: "https://example.com/vaso.jpg",
            price: -100,
            height: 10,
            width: 5,
        });
        const error = container.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.price).toBeDefined();
    }));
    it("debe aceptar diámetro calculado", () => __awaiter(void 0, void 0, void 0, function* () {
        const container = new container_model_1.ContainerModel({
            name: "Jarra",
            imageUrl: "https://example.com/jarra.jpg",
            price: 25000,
            height: 25,
            width: 15,
            diameter: 20,
        });
        const error = container.validateSync();
        expect(error).toBeUndefined();
    }));
});
