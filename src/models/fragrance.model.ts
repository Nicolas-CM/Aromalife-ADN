import mongoose from "mongoose";
import { FragranceInput } from "../interfaces";

export interface FragranceDocument extends FragranceInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }
  
  const fragranceSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      color: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
    },
    { timestamps: true, collection: "fragrances" }
  );
  
  export const FragranceModel = mongoose.model<FragranceDocument>("Fragrance", fragranceSchema);
  