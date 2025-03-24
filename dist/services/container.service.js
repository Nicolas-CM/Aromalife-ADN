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
const models_1 = require("../models");
class ContainerService {
    create(containerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield models_1.ContainerModel.create(containerInput);
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containers = yield models_1.ContainerModel.find();
                return containers;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield models_1.ContainerModel.findById(id);
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, containerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield models_1.ContainerModel.findOneAndUpdate({ _id: id }, containerInput, { returnOriginal: false });
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const container = yield models_1.ContainerModel.findByIdAndDelete(id);
                return container;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.containerService = new ContainerService();
