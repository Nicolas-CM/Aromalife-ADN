// Importing mongoose library for MongoDB schema and model creation
import mongoose from "mongoose";

// Defining the GiftDocument interface
// This extends mongoose.Document and includes properties for a gift
export interface GiftDocument extends mongoose.Document {
  // Property for the name of the gift
  name: string;
  // Optional property for the description of the gift
  description?: string;
  // Property for the price of the gift
  price: number;
  // Optional property for the image URL of the gift
  imageUrl?: string;
  // Property for the creation date of the document
  createdAt: Date;
  // Property for the last update date of the document
  updatedAt: Date;
}

// Defining the schema for the gift
const giftSchema = new mongoose.Schema(
  {
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
  { timestamps: true, collection: "gifts" }
);

// Creating the Gift model using the schema
export const GiftModel = mongoose.model<GiftDocument>(
  "Gift", // Name of the model
  giftSchema // Schema used for the model
);