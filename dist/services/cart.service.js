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
exports.cartService = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
class CartService {
    create(cartInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si el usuario existe
                const userExists = yield models_2.UserModel.exists({ _id: cartInput.userId });
                if (!userExists) {
                    throw new Error(`User with id ${cartInput.userId} does not exist`);
                }
                // Verificar si los productos existen
                for (const item of cartInput.items) {
                    const candleExists = yield models_2.CandleCustomizationModel.exists({
                        _id: item.candleId,
                    });
                    if (!candleExists) {
                        throw new Error(`Candle with id ${item.candleId} does not exist`);
                    }
                }
                const cart = yield models_1.CartModel.create(cartInput);
                return cart;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield models_1.CartModel.find();
                return carts;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield models_1.CartModel.findById(id);
                return cart;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, cartInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar si los productos existen
                if (cartInput.items) {
                    for (const item of cartInput.items) {
                        const candleExists = yield models_2.CandleCustomizationModel.exists({
                            _id: item.candleId,
                        });
                        if (!candleExists) {
                            throw new Error(`Candle with id ${item.candleId} does not exist`);
                        }
                    }
                }
                const cart = yield models_1.CartModel.findOneAndUpdate({ _id: id }, cartInput, { returnOriginal: false });
                return cart;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield models_1.CartModel.findByIdAndDelete(id);
                return cart;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.cartService = new CartService();
