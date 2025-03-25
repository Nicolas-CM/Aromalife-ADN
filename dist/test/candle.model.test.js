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
const candle_model_1 = require("../models/candle.model");
describe("CandleCustomizationModel", () => {
    it("debe requerir el usuario", () => __awaiter(void 0, void 0, void 0, function* () {
        const customization = new candle_model_1.CandleCustomizationModel({
            containerId: "60b8a45f9f1b2c0017a1d4d5",
            fragranceId: "60b8a45f9f1b2c0017a1d4d6",
            customImage: "https://example.com/image.jpg",
        });
        const error = customization.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.user).toBeDefined();
    }));
    it("debe requerir containerId", () => __awaiter(void 0, void 0, void 0, function* () {
        const customization = new candle_model_1.CandleCustomizationModel({
            user: "user123",
            fragranceId: "60b8a45f9f1b2c0017a1d4d6",
            customImage: "https://example.com/image.jpg",
        });
        const error = customization.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.containerId).toBeDefined();
    }));
    it("debe requerir fragranceId", () => __awaiter(void 0, void 0, void 0, function* () {
        const customization = new candle_model_1.CandleCustomizationModel({
            user: "user123",
            containerId: "60b8a45f9f1b2c0017a1d4d5",
            customImage: "https://example.com/image.jpg",
        });
        const error = customization.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.fragranceId).toBeDefined();
    }));
    it("debe requerir customImage", () => __awaiter(void 0, void 0, void 0, function* () {
        const customization = new candle_model_1.CandleCustomizationModel({
            user: "user123",
            containerId: "60b8a45f9f1b2c0017a1d4d5",
            fragranceId: "60b8a45f9f1b2c0017a1d4d6",
        });
        const error = customization.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.customImage).toBeDefined();
    }));
    it("debe asignar el estado por defecto como 'draft'", () => __awaiter(void 0, void 0, void 0, function* () {
        const customization = new candle_model_1.CandleCustomizationModel({
            user: "user123",
            containerId: "60b8a45f9f1b2c0017a1d4d5",
            fragranceId: "60b8a45f9f1b2c0017a1d4d6",
            customImage: "https://example.com/image.jpg",
        });
        expect(customization.status).toBe("draft");
    }));
    it("debe permitir solo valores válidos para el estado", () => __awaiter(void 0, void 0, void 0, function* () {
        const customization = new candle_model_1.CandleCustomizationModel({
            user: "user123",
            containerId: "60b8a45f9f1b2c0017a1d4d5",
            fragranceId: "60b8a45f9f1b2c0017a1d4d6",
            customImage: "https://example.com/image.jpg",
            status: "invalid-status",
        });
        const error = customization.validateSync();
        expect(error === null || error === void 0 ? void 0 : error.errors.status).toBeDefined();
    }));
});
