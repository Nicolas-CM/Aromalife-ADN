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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerController = void 0;
const services_1 = require("../services");
// Defining the ContainerController class to handle container-related operations
class ContainerController {
    // Method to create a new container
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting height and width from the request body
                const _a = req.body, { height, width } = _a, rest = __rest(_a, ["height", "width"]);
                // Calculating the diameter as the average of height and width
                const diameter = (height + width) / 2;
                // Creating a new container using the service and request body
                const newContainer = yield services_1.containerService.create(Object.assign(Object.assign({}, rest), { height,
                    width,
                    diameter }));
                // Sending a 201 status with the created container as a response
                res.status(201).json(newContainer);
            }
            catch (error) {
                // Handling specific error when the container already exists
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Container already exists" });
                    return;
                }
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve a specific container by its ID
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Finding the container by ID
                const container = yield services_1.containerService.findById(id);
                // If the container is not found, return a 404 status with an error message
                if (container === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                // Sending the found container as a response
                res.json(container);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to retrieve all containers
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetching all containers
                const containers = yield services_1.containerService.findAll();
                // Sending the list of containers as a response
                res.json(containers);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to update an existing container by its ID
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Updating the container with the provided data
                const container = yield services_1.containerService.update(id, req.body);
                // If the container is not found, return a 404 status with an error message
                if (container === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                // Sending the updated container as a response
                res.json(container);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
    // Method to delete a container by its ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extracting the ID from the request parameters
                const id = req.params.id;
                // Deleting the container by ID
                const container = yield services_1.containerService.delete(id);
                // If the container is not found, return a 404 status with an error message
                if (container === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                // Sending the deleted container as a response
                res.json(container);
            }
            catch (error) {
                // Handling generic server errors
                res.status(500).json(error);
            }
        });
    }
}
// Exporting an instance of the ContainerController class for use in other parts of the application
exports.containerController = new ContainerController();
