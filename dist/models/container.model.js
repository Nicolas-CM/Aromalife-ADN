"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const containerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, minlength: 3 },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 }, // Altura
    width: { type: Number, required: true, min: 0 }, // Ancho
    diameter: { type: Number, required: false, min: 0 }, // Diámetro opcional
}, { timestamps: true, collection: "containers" });
exports.ContainerModel = mongoose_1.default.model("Container", containerSchema);
