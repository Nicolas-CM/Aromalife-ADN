import mongoose from "mongoose";
import { ContainerInput } from "../interfaces";

export interface ContainerDocument extends ContainerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const containerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    height: { type: Number, required: true, min: 0 }, // Altura
    width: { type: Number, required: true, min: 0 },  // Ancho
    diameter: { type: Number, required: false, min: 0 }, // Diámetro opcional
  },
  { timestamps: true, collection: "containers" }
);

export const ContainerModel = mongoose.model<ContainerDocument>("Container", containerSchema);
