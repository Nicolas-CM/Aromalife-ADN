"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandleCustomizationModel = void 0;
// Importing mongoose library for MongoDB schema and model creation
const mongoose_1 = __importDefault(require("mongoose"));
// Defining the schema for candle customizations
const candleCustomizationSchema = new mongoose_1.default.Schema({
    // Property for the user ID, required as a string
    userId: { type: String, required: true },
    // Property for the container ID, required and references the "Container" model
    containerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Container",
        required: true,
    },
    // Property for the fragrance ID, required and references the "Fragrance" model
    fragranceId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Fragrance",
        required: true,
    },
    // Property for the custom image, required as a string
    customImage: { type: String, required: true },
    // Property for the status, with allowed values "draft" or "completed", default is "draft"
    status: {
        type: String,
        enum: ["draft", "completed"],
        default: "draft",
    },
    // Optional property for AI-generated messages
    aiMessage: { type: String },
    // Optional property for VR preview data or URL
    vrPreview: { type: String },
}, 
// Schema options to include timestamps and specify the collection name
{ timestamps: true, collection: "candle_customizations" });
// Creating the CandleCustomization model using the schema
exports.CandleCustomizationModel = mongoose_1.default.model("CandleCustomization", // Name of the model
candleCustomizationSchema // Schema used for the model
);
