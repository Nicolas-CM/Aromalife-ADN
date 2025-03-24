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
exports.fragranceService = void 0;
const models_1 = require("../models");
class FragranceService {
    create(fragranceInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield models_1.FragranceModel.create(fragranceInput);
                return fragrance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrances = yield models_1.FragranceModel.find();
                return fragrances;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield models_1.FragranceModel.findById(id);
                return fragrance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, fragranceInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield models_1.FragranceModel.findOneAndUpdate({ _id: id }, fragranceInput, { returnOriginal: false });
                return fragrance;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrance = yield models_1.FragranceModel.findByIdAndDelete(id);
                return fragrance;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.fragranceService = new FragranceService();
