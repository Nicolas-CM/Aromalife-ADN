"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FragranceModel = void 0;
// Importing mongoose library for MongoDB schema and model creation
const mongoose_1 = __importDefault(require("mongoose"));
// Defining the schema for the fragrance
const fragranceSchema = new mongoose_1.default.Schema({
    // Property for the name of the fragrance, required
    name: { type: String, required: true },
    // Property for the color of the fragrance, required
    color: { type: String, required: true },
    // Property for the price of the fragrance, required and must be a non-negative number
    price: { type: Number, required: true, min: 0 },
}, 
// Schema options to include timestamps and specify the collection name
{ timestamps: true, collection: "fragrances" });
// Creating the Fragrance model using the schema
exports.FragranceModel = mongoose_1.default.model("Fragrance", // Name of the model
fragranceSchema // Schema used for the model
);
