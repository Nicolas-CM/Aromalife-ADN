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
exports.candleCustomizationController = void 0;
// Import the candle customization service.
const services_1 = require("../services");
// Define the CandleCustomizationController class to handle operations related to candle customizations.
class CandleCustomizationController {
    // Define a method to create a new candle customization.
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call the service to create a new customization.
                const newCustomization = yield services_1.candleCustomizationService.create(req.body);
                // Return the new customization with a 201 status code.
                res.status(201).json(newCustomization);
            }
            catch (error) {
                // If a reference error occurs, return an error message with a 400 status code.
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Customization already exists" });
                    return;
                }
                // If another error occurs, return a 500 status code.
                res.status(500).json(error);
            }
        });
    }
    // Define a method to get a candle customization by its ID.
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the ID from the request parameters.
                const id = req.params.id;
                // Call the service to find the customization by ID.
                const customization = yield services_1.candleCustomizationService.findById(id);
                // If the customization is not found, return an error message with a 404 status code.
                if (customization === null) {
                    res
                        .status(404)
                        .json({ message: `Customization with id ${id} not found` });
                    return;
                }
                // Return the found customization.
                res.json(customization);
            }
            catch (error) {
                // If an error occurs, return a 500 status code.
                res.status(500).json(error);
            }
        });
    }
    // Define a method to get all candle customizations.
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Call the service to get all customizations.
                const customizations = yield services_1.candleCustomizationService.findAll();
                // Return all customizations.
                res.json(customizations);
            }
            catch (error) {
                // If an error occurs, return a 500 status code.
                res.status(500).json(error);
            }
        });
    }
    // Define a method to update a candle customization by its ID.
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the ID from the request parameters.
                const id = req.params.id;
                // Call the service to update the customization.
                const customization = yield services_1.candleCustomizationService.update(id, req.body);
                // If the customization is not found, return an error message with a 404 status code.
                if (customization === null) {
                    res
                        .status(404)
                        .json({ message: `Customization with id ${id} not found` });
                    return;
                }
                // Return the updated customization.
                res.json(customization);
            }
            catch (error) {
                // If an error occurs, return a 500 status code.
                res.status(500).json(error);
            }
        });
    }
    // Define a method to delete a candle customization by its ID.
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the ID from the request parameters.
                const id = req.params.id;
                // Call the service to delete the customization.
                const customization = yield services_1.candleCustomizationService.delete(id);
                // If the customization is not found, return an error message with a 404 status code.
                if (customization === null) {
                    res
                        .status(404)
                        .json({ message: `Customization with id ${id} not found` });
                    return;
                }
                // Return the deleted customization.
                res.json(customization);
            }
            catch (error) {
                // If an error occurs, return a 500 status code.
                res.status(500).json(error);
            }
        });
    }
}
// Export an instance of the CandleCustomizationController class.
exports.candleCustomizationController = new CandleCustomizationController();
