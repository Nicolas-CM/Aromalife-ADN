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
const gift_model_1 = require("../models/gift.model");
it("debe guardar el regalo correctamente con todos los campos", () => __awaiter(void 0, void 0, void 0, function* () {
    const gift = new gift_model_1.GiftModel({
        name: "Flores",
        description: "Ramo de flores frescas",
        price: 20000,
        imageUrl: "https://example.com/flores.jpg",
    });
    const error = gift.validateSync();
    expect(error).toBeUndefined();
}));
it("debe requerir precio", () => __awaiter(void 0, void 0, void 0, function* () {
    const gift = new gift_model_1.GiftModel({
        name: "Chocolates",
        description: "Caja de chocolates",
        imageUrl: "https://example.com/chocolates.jpg",
    });
    const error = gift.validateSync();
    expect(error === null || error === void 0 ? void 0 : error.errors.price).toBeDefined();
}));
it("debe requerir nombre", () => __awaiter(void 0, void 0, void 0, function* () {
    const gift = new gift_model_1.GiftModel({
        description: "Botella de vino tinto",
        price: 30000,
        imageUrl: "https://example.com/vino.jpg",
    });
    const error = gift.validateSync();
    expect(error === null || error === void 0 ? void 0 : error.errors.name).toBeDefined();
}));
