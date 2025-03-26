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
class CartController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCart = yield services_1.cartService.create(req.body);
                res.status(201).json(newCart);
            }
            catch (error) {
                console.log(error);
                res.status(400).json(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const cart = yield services_1.cartService.findById(id);
                if (cart === null) {
                    res.status(404).json({ message: `Cart with id ${id} not found` });
                    return;
                }
                res.json(cart);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield services_1.cartService.findAll();
                res.json(carts);
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
                const cart = yield services_1.cartService.update(id, req.body);
                if (cart === null) {
                    res.status(404).json({ message: `Cart with id ${id} not found` });
                    return;
                }
                res.json(cart);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const cart = yield services_1.cartService.delete(id);
                if (cart === null) {
                    res.status(404).json({ message: `Cart with id ${id} not found` });
                    return;
                }
                res.json(cart);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.cartController = new CartController();
