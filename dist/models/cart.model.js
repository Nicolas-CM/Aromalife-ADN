"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
// Importing mongoose library for MongoDB schema and model creation
const mongoose_1 = __importDefault(require("mongoose"));
// Defining the schema for the cart
const cartSchema = new mongoose_1.default.Schema({
    // Property for the user ID, required and references the "User" model
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // Array of items in the cart
    items: [
        {
            // Property for the candle ID, required and references the "CandleCustomization" model
            candleId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "CandleCustomization",
                required: true,
            },
            // Property for the quantity of the item, required and must be at least 1
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    // Array of gift items in the cart
    gifts: [
        {
            // Property for the gift ID, optional and references the "Gift" model
            giftId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Gift",
                required: false,
            },
            // Property for the quantity of the gift item, optional and must be at least 1
            quantity: { type: Number, required: false, min: 1 },
        },
    ],
}, 
// Schema options to include timestamps and specify the collection name
{ timestamps: true, collection: "carts" });
// Creating the Cart model using the schema
exports.CartModel = mongoose_1.default.model("Cart", cartSchema);
