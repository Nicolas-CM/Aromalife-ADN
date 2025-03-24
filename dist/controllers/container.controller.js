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
class ContainerController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Calcular el diámetro como promedio de la altura y el ancho
                const _a = req.body, { height, width } = _a, rest = __rest(_a, ["height", "width"]);
                const diameter = (height + width) / 2;
                const newContainer = yield services_1.containerService.create(Object.assign(Object.assign({}, rest), { height,
                    width,
                    diameter }));
                res.status(201).json(newContainer);
            }
            catch (error) {
                if (error instanceof ReferenceError) {
                    res.status(400).json({ message: "Container already exists" });
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
                const container = yield services_1.containerService.findById(id);
                if (container === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                res.json(container);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containers = yield services_1.containerService.findAll();
                res.json(containers);
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
                const container = yield services_1.containerService.update(id, req.body);
                if (container === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                res.json(container);
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
                const container = yield services_1.containerService.delete(id);
                if (container === null) {
                    res.status(404).json({ message: `Container with id ${id} not found` });
                    return;
                }
                res.json(container);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.containerController = new ContainerController();
