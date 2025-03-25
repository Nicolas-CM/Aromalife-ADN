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
class GiftController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newGift = yield services_1.giftService.create(req.body);
                res.status(201).json(newGift);
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Gift already exists" });
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
                const gift = yield services_1.giftService.findById(id);
                if (gift === null) {
                    res.status(404).json({ message: `Gift with id ${id} not found` });
                    return;
                }
                res.json(gift);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gifts = yield services_1.giftService.findAll();
                res.json(gifts);
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
                const gift = yield services_1.giftService.update(id, req.body);
                if (gift === null) {
                    res.status(404).json({ message: `Gift with id ${id} not found` });
                    return;
                }
                res.json(gift);
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
                const gift = yield services_1.giftService.delete(id);
                if (gift === null) {
                    res.status(404).json({ message: `Gift with id ${id} not found` });
                    return;
                }
                res.json({ message: "Gift deleted successfully" });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.giftController = new GiftController();
