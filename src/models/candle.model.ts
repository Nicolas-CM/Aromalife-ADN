import mongoose from "mongoose";
import { CandleCustomizationInput } from "../interfaces/candle.interface";

export interface CandleCustomizationDocument
  extends CandleCustomizationInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const candleCustomizationSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    containerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Container",
      required: true,
    },
    fragranceId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true, collection: "candle_customizations" }
);

export const CandleCustomizationModel =
  mongoose.model<CandleCustomizationDocument>(
    "CandleCustomization",
    candleCustomizationSchema
  );
