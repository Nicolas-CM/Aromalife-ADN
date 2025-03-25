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
exports.giftService = void 0;
const models_1 = require("../models");
class GiftService {
    create(giftInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gift = yield models_1.GiftModel.create(giftInput);
                return gift;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gifts = yield models_1.GiftModel.find();
                return gifts;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gift = yield models_1.GiftModel.findById(id);
                return gift;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, giftInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gift = yield models_1.GiftModel.findOneAndUpdate({ _id: id }, giftInput, { returnOriginal: false });
                return gift;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gift = yield models_1.GiftModel.findByIdAndDelete(id);
                return gift;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.giftService = new GiftService();
