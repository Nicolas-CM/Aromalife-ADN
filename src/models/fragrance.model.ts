// Importing mongoose library for MongoDB schema and model creation
import mongoose from "mongoose";

// Importing the FragranceInput interface for type definitions
import { FragranceInput } from "../interfaces";

// Defining the FragranceDocument interface
// This extends FragranceInput and includes mongoose.Document properties
export interface FragranceDocument extends FragranceInput, mongoose.Document {
  // Property for the creation date of the document
  createdAt: Date;
  // Property for the last update date of the document
  updatedAt: Date;
  // Property for the deletion date of the document
  deletedAt: Date;
}

// Defining the schema for the fragrance
const fragranceSchema = new mongoose.Schema(
  {
    // Property for the name of the fragrance, required
    name: { type: String, required: true },
    // Property for the color of the fragrance, required
    color: { type: String, required: true },
    // Property for the price of the fragrance, required and must be a non-negative number
    price: { type: Number, required: true, min: 0 },
  },
  // Schema options to include timestamps and specify the collection name
  { timestamps: true, collection: "fragrances" }
);

// Creating the Fragrance model using the schema
export const FragranceModel = mongoose.model<FragranceDocument>(
  "Fragrance", // Name of the model
  fragranceSchema // Schema used for the model
);