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
// Import necessary types and models for the service
const models_1 = require("../models");
class FragranceService {
    // Method to create a new fragrance
    create(fragranceInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a fragrance with the same name already exists
                const fragranceExists = yield this.findByName(fragranceInput.name);
                if (fragranceExists != null) {
                    // Throw an error if the fragrance already exists
                    throw new ReferenceError("Fragrance already exists");
                }
                // Create a new fragrance document in the database
                const fragrance = yield models_1.FragranceModel.create(fragranceInput);
                return fragrance;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to find a fragrance by its name
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Search for a fragrance document with the specified name
                const fragrance = yield models_1.FragranceModel.findOne({ name });
                return fragrance;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to retrieve all fragrances
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all fragrance documents from the database
                const fragrances = yield models_1.FragranceModel.find();
                return fragrances;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to find a fragrance by its ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Search for a fragrance document with the specified ID
                const fragrance = yield models_1.FragranceModel.findById(id);
                return fragrance;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to update an existing fragrance
    update(id, fragranceInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find and update the fragrance document with the specified ID
                const fragrance = yield models_1.FragranceModel.findOneAndUpdate({ _id: id }, fragranceInput, { returnOriginal: false } // Return the updated document
                );
                return fragrance;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to delete a fragrance by its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find and delete the fragrance document with the specified ID
                const fragrance = yield models_1.FragranceModel.findByIdAndDelete(id);
                return fragrance;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
}
// Export an instance of the FragranceService class
exports.fragranceService = new FragranceService();
