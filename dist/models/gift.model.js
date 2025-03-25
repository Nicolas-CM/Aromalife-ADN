"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const giftSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String },
}, { timestamps: true, collection: "gifts" });
exports.GiftModel = mongoose_1.default.model("Gift", giftSchema);
