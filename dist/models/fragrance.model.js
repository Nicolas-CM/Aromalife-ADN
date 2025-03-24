"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FragranceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fragranceSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
}, { timestamps: true, collection: "fragrances" });
exports.FragranceModel = mongoose_1.default.model("Fragrance", fragranceSchema);
