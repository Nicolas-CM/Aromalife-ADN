"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftModel = void 0;
// Importing mongoose library for MongoDB schema and model creation
const mongoose_1 = __importDefault(require("mongoose"));
// Defining the schema for the gift
const giftSchema = new mongoose_1.default.Schema({
    // Property for the name of the gift, required and must be unique
    name: { type: String, required: true, unique: true },
    // Optional property for the description of the gift
    description: { type: String },
    // Property for the price of the gift, required and must be a non-negative number
    price: { type: Number, required: true, min: 0 },
    // Optional property for the image URL of the gift
    imageUrl: { type: String },
}, 
// Schema options to include timestamps and specify the collection name
{ timestamps: true, collection: "gifts" });
// Creating the Gift model using the schema
exports.GiftModel = mongoose_1.default.model("Gift", // Name of the model
giftSchema // Schema used for the model
);
