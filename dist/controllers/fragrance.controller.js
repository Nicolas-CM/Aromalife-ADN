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
exports.fragranceController = void 0;
const services_1 = require("../services"); // Fragrance service for handling business logic
// Defining the FragranceController class to handle fragrance-related operations
class FragranceController {
    // Method to create a new fragrance
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Creating a new fragrance using the service and request body
                const newFragrance = yield services_1.fragranceService.create(req.body);
                // Sending a 201 status with the created fragrance as a response
                res.status(201).json(newFragrance);
            }
            catch (error) {
                // Handling specific error when the fragrance already exists
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Fragrance already exists" });
                    return;
                }
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve a specific fragrance by its ID
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Finding the fragrance by ID
                const fragrance = yield services_1.fragranceService.findById(id);
                if (fragrance === null) {
                    // If the fragrance is not found, return a 404 status with an error message
                    res.status(404).json({ message: `Fragrance with id ${id} not found` });
                    return;
                }
                // Sending the found fragrance as a response
                res.json(fragrance);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve all fragrances
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetching all fragrances
                const fragrances = yield services_1.fragranceService.findAll();
                // Sending the list of fragrances as a response
                res.json(fragrances);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to update an existing fragrance by its ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                const fragrance = yield services_1.fragranceService.update(id, 
                // Updating the fragrance with the provided data
                req.body);
                if (fragrance === null) {
                    // If the fragrance is not found, return a 404 status with an error message
                    res.status(404).json({ message: `Fragrance with id ${id} not found` });
                    return;
                }
                // Sending the updated fragrance as a response
                res.json(fragrance);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to delete a fragrance by its ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Deleting the fragrance by ID
                const fragrance = yield services_1.fragranceService.delete(id);
                if (fragrance === null) {
                    // If the fragrance is not found, return a 404 status with an error message
                    res.status(404).json({ message: `Fragrance with id ${id} not found` });
                    return;
                }
                // Sending the deleted fragrance as a response
                res.json(fragrance);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
}
// Exporting an instance of the FragranceController class for use in other parts of the application
exports.fragranceController = new FragranceController();
