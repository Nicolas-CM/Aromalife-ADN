// Importing mongoose library for MongoDB schema and model creation
import mongoose from "mongoose";

// Importing the CartInput interface for type definitions
import { CartInput } from "../interfaces";

// Defining the CartDocument interface
// This extends CartInput and includes mongoose.Document properties
export interface CartDocument extends CartInput, mongoose.Document {
  // Property for the creation date of the document
  createdAt: Date;
  // Property for the last update date of the document
  updatedAt: Date;
}

// Defining the schema for the cart
const cartSchema = new mongoose.Schema(
  {
    // Property for the user ID, required and references the "User" model
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Array of items in the cart
    items: [
      {
        // Property for the candle ID, required and references the "CandleCustomization" model
        candleId: {
          type: mongoose.Schema.Types.ObjectId,
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
          type: mongoose.Schema.Types.ObjectId,
          ref: "Gift",
          required: false,
        },
        // Property for the quantity of the gift item, optional and must be at least 1
        quantity: { type: Number, required: false, min: 1 },
      },
    ],
  },
  // Schema options to include timestamps and specify the collection name
  { timestamps: true, collection: "carts" }
);

// Creating the Cart model using the schema
export const CartModel = mongoose.model<CartDocument>("Cart", cartSchema);