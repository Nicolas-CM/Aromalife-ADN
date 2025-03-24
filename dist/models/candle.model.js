"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleCustomizationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const candleCustomizationSchema = new mongoose_1.default.Schema({
    user: { type: String, required: true },
    containerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Container",
        required: true,
    },
    fragranceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Fragrance",
        required: true,
    },
    customImage: { type: String, required: true },
    status: {
        type: String,
        enum: ["draft", "completed"],
        default: "draft",
    },
    aiMessage: { type: String },
    vrPreview: { type: String },
}, { timestamps: true, collection: "candle_customizations" });
exports.CandleCustomizationModel = mongoose_1.default.model("CandleCustomization", candleCustomizationSchema);
