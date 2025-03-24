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
const fragrance_model_1 = require("../models/fragrance.model");
it("debe guardar color en formato hexadecimal", () => __awaiter(void 0, void 0, void 0, function* () {
    const fragrance = new fragrance_model_1.FragranceModel({
        name: "Azul",
        color: "#0000FF",
        price: 15000,
    });
    const error = fragrance.validateSync();
    expect(error).toBeUndefined();
}));
it("debe requerir precio ", () => __awaiter(void 0, void 0, void 0, function* () {
    const fragrance = new fragrance_model_1.FragranceModel({
        name: "Rojo",
        color: "#FF0000",
    });
    const error = fragrance.validateSync();
    expect(error === null || error === void 0 ? void 0 : error.errors.price).toBeDefined();
}));
it("debe requerir nombre ", () => __awaiter(void 0, void 0, void 0, function* () {
    const fragrance = new fragrance_model_1.FragranceModel({
        color: "#FF0000",
        price: 20000,
    });
    const error = fragrance.validateSync();
    expect(error === null || error === void 0 ? void 0 : error.errors.name).toBeDefined();
}));
it("debe requerir color ", () => __awaiter(void 0, void 0, void 0, function* () {
    const fragrance = new fragrance_model_1.FragranceModel({
        name: "Verde",
        price: 20000,
    });
    const error = fragrance.validateSync();
    expect(error === null || error === void 0 ? void 0 : error.errors.color).toBeDefined();
}));
