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
const services_1 = require("../services");
class FragranceController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newFragrance = yield services_1.fragranceService.create(req.body);
                res.status(201).json(newFragrance);
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Fragrance already exists" });
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
                const fragrance = yield services_1.fragranceService.findById(id);
                if (fragrance === null) {
                    res.status(404).json({ message: `Fragrance with id ${id} not found` });
                    return;
                }
                res.json(fragrance);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fragrances = yield services_1.fragranceService.findAll();
                res.json(fragrances);
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
                const fragrance = yield services_1.fragranceService.update(id, req.body);
                if (fragrance === null) {
                    res.status(404).json({ message: `Fragrance with id ${id} not found` });
                    return;
                }
                res.json(fragrance);
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
                const fragrance = yield services_1.fragranceService.delete(id);
                if (fragrance === null) {
                    res.status(404).json({ message: `Fragrance with id ${id} not found` });
                    return;
                }
                res.json(fragrance);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.fragranceController = new FragranceController();
