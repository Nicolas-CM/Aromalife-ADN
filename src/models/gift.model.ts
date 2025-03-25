import mongoose from "mongoose";

export interface GiftDocument extends mongoose.Document {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const giftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String },
  },
  { timestamps: true, collection: "gifts" }
);

export const GiftModel = mongoose.model<GiftDocument>("Gift", giftSchema);
