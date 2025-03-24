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
exports.candleCustomizationService = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
class CustomizationService {
    // Crear personalización validando que existan container y fragancia
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar que el contenedor existe
                const containerExists = yield models_2.ContainerModel.findById(data.containerId);
                if (!containerExists)
                    throw new ReferenceError("Not valid container");
                // Verificar que la fragancia existe
                const fragranceExists = yield models_2.FragranceModel.findById(data.fragranceId);
                if (!fragranceExists)
                    throw new ReferenceError("Not valid fragrance");
                const userExists = yield models_2.UserModel.findById(data.userId);
                if (!userExists)
                    throw new ReferenceError("Not valid user");
                const customization = yield models_1.CandleCustomizationModel.create(data);
                return customization;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Obtener personalización con datos poblados
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customization = yield models_1.CandleCustomizationModel.findById(id)
                    .populate("containerId") // Trae los datos del contenedor
                    .populate("fragranceId"); // Trae los datos de la fragancia
                if (!customization)
                    throw new ReferenceError("Personalization not found");
                return customization;
            }
            catch (error) {
                throw error;
            }
        });
    }
    //
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candles = yield models_1.CandleCustomizationModel.find();
                return candles;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Actualizar personalización
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customization = yield models_1.CandleCustomizationModel.findByIdAndUpdate(id, data, { returnOriginal: false });
                if (!customization)
                    throw new ReferenceError("Personalization not found");
                return customization;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // Eliminar personalización
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customization = yield models_1.CandleCustomizationModel.findByIdAndDelete(id);
                if (!customization)
                    throw new ReferenceError("Personalization not found");
                return customization;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.candleCustomizationService = new CustomizationService();
