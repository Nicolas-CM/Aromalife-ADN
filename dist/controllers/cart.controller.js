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
exports.cartController = void 0;
const services_1 = require("../services");
// Defining the CartController class to handle cart-related operations
class CartController {
    // Method to create a new cart
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try block to handle the creation of a new cart
            try {
                // Creating a new cart using the cartService and request body
                const newCart = yield services_1.cartService.create(req.body);
                // Sending a 201 status with the created cart as a response
                res.status(201).json(newCart);
            }
            catch (error) {
                // Catch block to handle errors during cart creation
                // Logging the error and sending a 400 status with the error as a response
                console.log(error);
                res.status(400).json(error);
            }
        });
    }
    // Method to get a specific cart by its ID
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try block to handle fetching a cart by ID
            try {
                // Extracting the cart ID from the request parameters
                const id = req.params.id;
                // Finding the cart by ID using the cartService
                const cart = yield services_1.cartService.findById(id);
                // If the cart is not found, send a 404 status with an error message
                if (cart === null) {
                    res.status(404).json({ message: `Cart with id ${id} not found` });
                    return;
                }
                // Sending the found cart as a response
                res.json(cart);
            }
            catch (error) {
                // Catch block to handle errors during fetching
                // Sending a 500 status with the error as a response
                res.status(500).json(error);
            }
        });
    }
    // Method to get all carts
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try block to handle fetching all carts
            try {
                // Retrieving all carts using the cartService
                const carts = yield services_1.cartService.findAll();
                // Sending the list of carts as a response
                res.json(carts);
            }
            catch (error) {
                // Catch block to handle errors during fetching
                // Sending a 500 status with the error as a response
                res.status(500).json(error);
            }
        });
    }
    // Method to update a specific cart by its ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try block to handle updating a cart by ID
            try {
                // Extracting the cart ID from the request parameters
                const id = req.params.id;
                // Updating the cart using the cartService and request body
                const cart = yield services_1.cartService.update(id, req.body);
                // If the cart is not found, send a 404 status with an error message
                if (cart === null) {
                    res.status(404).json({ message: `Cart with id ${id} not found` });
                    return;
                }
                // Sending the updated cart as a response
                res.json(cart);
            }
            catch (error) {
                // Catch block to handle errors during updating
                // Sending a 400 status with the error as a response
                res.status(400).json(error);
            }
        });
    }
    // Method to delete a specific cart by its ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try block to handle deleting a cart by ID
            try {
                // Extracting the cart ID from the request parameters
                const id = req.params.id;
                // Deleting the cart using the cartService
                const cart = yield services_1.cartService.delete(id);
                // If the cart is not found, send a 404 status with an error message
                if (cart === null) {
                    res.status(404).json({ message: `Cart with id ${id} not found` });
                    return;
                }
                // Sending the deleted cart as a response
                res.json(cart);
            }
            catch (error) {
                // Catch block to handle errors during deletion
                // Sending a 500 status with the error as a response
                res.status(500).json(error);
            }
        });
    }
}
// Exporting an instance of the CartController class for use in other parts of the application
exports.cartController = new CartController();
