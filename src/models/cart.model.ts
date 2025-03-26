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
        candleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CandleCustomization",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    gifts: [{
      giftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gift",
        required: false,
      },
      quantity: { type: Number, required: false, min: 1 },
    }

    ],
  },
  { timestamps: true, collection: "carts" }
);

export const CartModel = mongoose.model<CartDocument>("Cart", cartSchema);
