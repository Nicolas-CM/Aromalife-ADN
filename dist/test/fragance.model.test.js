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
describe("Fragrance Model", () => {
    it("debe guardar nombre, precio y color", () => __awaiter(void 0, void 0, void 0, function* () {
        const fragrance = new fragrance_model_1.FragranceModel({
            name: "Azul",
            color: "Azul",
            price: 15000,
        });
        const fraganceMongo = yield fragrance.save();
        expect(fraganceMongo._id).toBeDefined();
        expect(fraganceMongo.name).toBe("Azul");
        expect(fraganceMongo.color).toBe("Azul");
        expect(fraganceMongo.price).toBe(15000);
    }));
    it("debe guardar color en formato hexadecimal", () => __awaiter(void 0, void 0, void 0, function* () {
        const fragrance = new fragrance_model_1.FragranceModel({
            name: "Azul",
            color: "#0000FF",
            price: 15000,
        });
        const error = fragrance.validateSync();
        expect(error).toBeUndefined();
    }));
});
