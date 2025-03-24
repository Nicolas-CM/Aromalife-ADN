import mongoose from "mongoose";
import { CartInput } from "../interfaces";

export interface CartDocument extends CartInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true, collection: "carts" }
);

export const CartModel = mongoose.model<CartDocument>("Cart", cartSchema);
