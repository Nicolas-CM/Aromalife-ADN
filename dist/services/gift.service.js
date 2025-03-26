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
// Importing the GiftDocument and GiftModel from the models directory
// Importing the GiftInput interface from the interfaces directory
const models_1 = require("../models");
// Defining the GiftService class
class GiftService {
    // Method to create a new gift document in the database
    create(giftInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Creating a new gift document using the GiftModel
                const gift = yield models_1.GiftModel.create(giftInput);
                return gift;
            }
            catch (error) {
                // Throwing an error if the operation fails
                throw error;
            }
        });
    }
    // Method to retrieve all gift documents from the database
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetching all gift documents using the GiftModel
                const gifts = yield models_1.GiftModel.find();
                return gifts;
            }
            catch (error) {
                // Throwing an error if the operation fails
                throw error;
            }
        });
    }
    // Method to find a specific gift document by its ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetching a gift document by its ID using the GiftModel
                const gift = yield models_1.GiftModel.findById(id);
                return gift;
            }
            catch (error) {
                // Throwing an error if the operation fails
                throw error;
            }
        });
    }
    // Method to update a specific gift document by its ID
    update(id, giftInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Updating a gift document and returning the updated document
                const gift = yield models_1.GiftModel.findOneAndUpdate({ _id: id }, giftInput, { returnOriginal: false });
                return gift;
            }
            catch (error) {
                // Throwing an error if the operation fails
                throw error;
            }
        });
    }
    // Method to delete a specific gift document by its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Deleting a gift document by its ID using the GiftModel
                const gift = yield models_1.GiftModel.findByIdAndDelete(id);
                return gift;
            }
            catch (error) {
                // Throwing an error if the operation fails
                throw error;
            }
        });
    }
}
// Exporting an instance of the GiftService class
exports.giftService = new GiftService();
