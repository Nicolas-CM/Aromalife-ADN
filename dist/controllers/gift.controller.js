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
exports.giftController = void 0;
const services_1 = require("../services");
// Defining the GiftController class to handle gift-related operations
class GiftController {
    // Method to create a new gift
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Creating a new gift using the service and request body
                const newGift = yield services_1.giftService.create(req.body);
                // Sending a 201 status with the created gift as a response
                res.status(201).json(newGift);
            }
            catch (error) {
                // Handling specific error when the gift already exists
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Gift already exists" });
                    return;
                }
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve a specific gift by its ID
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Finding the gift by ID
                const gift = yield services_1.giftService.findById(id);
                // If the gift is not found, return a 404 status with an error message
                if (gift === null) {
                    res.status(404).json({ message: `Gift with id ${id} not found` });
                    return;
                }
                // Sending the found gift as a response
                res.json(gift);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve all gifts
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetching all gifts
                const gifts = yield services_1.giftService.findAll();
                // Sending the list of gifts as a response
                res.json(gifts);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to update an existing gift by its ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Updating the gift with the provided data
                const gift = yield services_1.giftService.update(id, req.body);
                // If the gift is not found, return a 404 status with an error message
                if (gift === null) {
                    res.status(404).json({ message: `Gift with id ${id} not found` });
                    return;
                }
                // Sending the updated gift as a response
                res.json(gift);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to delete a gift by its ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Deleting the gift by ID
                const gift = yield services_1.giftService.delete(id);
                // If the gift is not found, return a 404 status with an error message
                if (gift === null) {
                    res.status(404).json({ message: `Gift with id ${id} not found` });
                    return;
                }
                // Sending a success message as a response
                res.json({ message: "Gift deleted successfully" });
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
}
// Exporting an instance of the GiftController class for use in other parts of the application
exports.giftController = new GiftController();
