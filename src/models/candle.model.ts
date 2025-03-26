// Importing mongoose library for MongoDB schema and model creation
import mongoose from "mongoose";

// Importing the CandleCustomizationInput interface for type definitions
import { CandleCustomizationInput } from "../interfaces/candle.interface";

// Defining the CandleCustomizationDocument interface
// This extends CandleCustomizationInput and includes mongoose.Document properties
export interface CandleCustomizationDocument
  extends CandleCustomizationInput,
    mongoose.Document {
  // Property for the creation date of the document
  createdAt: Date;
  // Property for the last update date of the document
  updatedAt: Date;
  // Property for the deletion date of the document
  deletedAt: Date;
}

// Defining the schema for candle customizations
const candleCustomizationSchema = new mongoose.Schema(
  {
    // Property for the user ID, required as a string
    userId: { type: String, required: true },
    // Property for the container ID, required and references the "Container" model
    containerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
      required: true,
    },
    // Property for the fragrance ID, required and references the "Fragrance" model
    fragranceId: {
      type: mongoose.Schema.Types.ObjectId,
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
  { timestamps: true, collection: "candle_customizations" }
);

// Creating the CandleCustomization model using the schema
export const CandleCustomizationModel =
  mongoose.model<CandleCustomizationDocument>(
    "CandleCustomization", // Name of the model
    candleCustomizationSchema // Schema used for the model
  );