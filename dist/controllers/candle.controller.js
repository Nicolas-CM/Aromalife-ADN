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
const services_1 = require("../services");
class CandleCustomizationController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCustomization = yield services_1.candleCustomizationService.create(req.body);
                res.status(201).json(newCustomization);
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Customization already exists" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const customization = yield services_1.candleCustomizationService.findById(id);
                if (customization === null) {
                    res
                        .status(404)
                        .json({ message: `Customization with id ${id} not found` });
                    return;
                }
                res.json(customization);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customizations = yield services_1.candleCustomizationService.findAll();
                res.json(customizations);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const customization = yield services_1.candleCustomizationService.update(id, req.body);
                if (customization === null) {
                    res
                        .status(404)
                        .json({ message: `Customization with id ${id} not found` });
                    return;
                }
                res.json(customization);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const customization = yield services_1.candleCustomizationService.delete(id);
                if (customization === null) {
                    res
                        .status(404)
                        .json({ message: `Customization with id ${id} not found` });
                    return;
                }
                res.json(customization);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.candleCustomizationController = new CandleCustomizationController();
