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
exports.containerService = void 0;
// Importing necessary types and models from other files
const models_1 = require("../models");
class ContainerService {
    // Method to create a new container
    create(containerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if a container with the same name already exists
                const containerExists = yield this.findByName(containerInput.name);
                if (containerExists != null) {
                    // Throw an error if the container already exists
                    throw new ReferenceError("Container already exists");
                }
                // Create a new container in the database
                const container = yield models_1.ContainerModel.create(containerInput);
                return container;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to find a container by its name
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Search for a container with the specified name
                const container = yield models_1.ContainerModel.findOne({ name });
                return container;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to retrieve all containers
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all containers from the database
                const containers = yield models_1.ContainerModel.find();
                return containers;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to find a container by its ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Search for a container with the specified ID
                const container = yield models_1.ContainerModel.findById(id);
                return container;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to update a container by its ID
    update(id, containerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the container with the specified ID and return the updated document
                const container = yield models_1.ContainerModel.findOneAndUpdate({ _id: id }, containerInput, { returnOriginal: false } // Return the updated document instead of the original
                );
                return container;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
    // Method to delete a container by its ID
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete the container with the specified ID
                const container = yield models_1.ContainerModel.findByIdAndDelete(id);
                return container;
            }
            catch (error) {
                // Rethrow any errors encountered
                throw error;
            }
        });
    }
}
// Exporting an instance of the ContainerService class
exports.containerService = new ContainerService();
