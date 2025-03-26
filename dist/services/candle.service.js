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
// Import necessary models and interfaces
const models_1 = require("../models");
const models_2 = require("../models");
// Define the CustomizationService class
class CustomizationService {
    // Create a new customization after validating that the container and fragrance exist
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verify that the container exists
                const containerExists = yield models_2.ContainerModel.findById(data.containerId);
                if (!containerExists)
                    throw new ReferenceError("Not valid container");
                // Verify that the fragrance exists
                const fragranceExists = yield models_2.FragranceModel.findById(data.fragranceId);
                if (!fragranceExists)
                    throw new ReferenceError("Not valid fragrance");
                // Verify that the user exists
                const userExists = yield models_2.UserModel.findById(data.userId);
                if (!userExists)
                    throw new ReferenceError("Not valid user");
                // Create the customization
                const customization = yield models_1.CandleCustomizationModel.create(data);
                return customization;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Retrieve a customization by ID with populated data
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the customization by ID
                const customization = yield models_1.CandleCustomizationModel.findById(id);
                if (!customization) {
                    // Throw an error if the customization is not found
                    throw new ReferenceError("Personalization not found");
                }
                else {
                    // Populate container and fragrance data
                    (yield customization.populate("containerId"))
                        .populate("fragranceId");
                    return customization;
                }
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Retrieve all customizations
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find all customizations
                const candles = yield models_1.CandleCustomizationModel.find();
                return candles;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Update an existing customization
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find and update the customization by ID
                const customization = yield models_1.CandleCustomizationModel.findByIdAndUpdate(id, data, { returnOriginal: false });
                if (!customization)
                    throw new ReferenceError("Personalization not found");
                return customization;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
    // Delete a customization by ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find and delete the customization by ID
                const customization = yield models_1.CandleCustomizationModel.findByIdAndDelete(id);
                if (!customization)
                    throw new ReferenceError("Personalization not found");
                return customization;
            }
            catch (error) {
                // Handle and rethrow any errors
                throw error;
            }
        });
    }
}
// Export an instance of the CustomizationService
exports.candleCustomizationService = new CustomizationService();
