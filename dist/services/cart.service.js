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
// Import necessary models and interfaces
const models_1 = require("../models");
const models_2 = require("../models");
class CartService {
    // Method to create a new cart
    create(cartInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the user exists
                const userExists = yield models_2.UserModel.exists({ _id: cartInput.userId });
                if (!userExists) {
                    throw new Error(`User with id ${cartInput.userId} does not exist`);
                }
                // Check if the candles exist
                for (const item of cartInput.items) {
                    const candleExists = yield models_2.CandleCustomizationModel.exists({
                        _id: item.candleId,
                    });
                    if (!candleExists) {
                        throw new Error(`Candle with id ${item.candleId} does not exist`);
                    }
                }
                // Check if the gifts exist
                if (cartInput.gifts) {
                    for (const item of cartInput.gifts) {
                        const giftExists = yield models_2.GiftModel.exists({ _id: item.giftId });
                        if (!giftExists) {
                            throw new Error(`Gift with id ${item.giftId} does not exist`);
                        }
                    }
                }
                // Create the cart and return it
                const cart = yield models_1.CartModel.create(cartInput);
                return cart;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Method to retrieve all carts
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all carts from the database
                const carts = yield models_1.CartModel.find();
                return carts;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Method to retrieve a cart by its ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch the cart with the specified ID
                const cart = yield models_1.CartModel.findById(id);
                return cart;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Method to update a cart by its ID
    update(id, cartInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the candles exist
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
                // Check if the gifts exist
                if (cartInput.gifts) {
                    for (const item of cartInput.gifts) {
                        const giftExists = yield models_2.GiftModel.exists({ _id: item.giftId });
                        if (!giftExists) {
                            throw new Error(`Gift with id ${item.giftId} does not exist`);
                        }
                    }
                }
                // Update the cart and return the updated document
                const cart = yield models_1.CartModel.findOneAndUpdate({ _id: id }, cartInput, { returnOriginal: false });
                return cart;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Method to delete a cart by its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete the cart with the specified ID
                const cart = yield models_1.CartModel.findByIdAndDelete(id);
                return cart;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
}
// Export an instance of the CartService class
exports.cartService = new CartService();
