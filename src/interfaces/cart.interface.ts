// Importing related interfaces for dependencies
import { ICandleCustomization, IGift } from "../interfaces"; // Interfaces for CandleCustomization and Gift

// Main interface representing a shopping cart
export interface ICart {
  _id: string; // Unique identifier for the cart
  userId: string; // Reference to the User who owns the cart
  items: ICartItem[]; // Array of items in the cart
}

// Interface representing an item in the cart
export interface ICartItem {
  candleId: ICandleCustomization["_id"]; // Reference to the CandleCustomization in the cart
  quantity: number; // Quantity of the item
}

// Interface representing a gift item in the cart
export interface IGiftItem {
  giftId: IGift["_id"]; // Reference to the Gift in the cart
  quantity: number; // Quantity of the gift item
}

// Input interface for creating or updating a cart
export interface CartInput {
  userId: string; // Reference to the User who owns the cart
  items: ICartItem[]; // Array of items in the cart
  gifts?: IGiftItem[]; // Optional array of gift items in the cart
}

// Input interface for updating an existing cart
export interface CartUpdateInput {
  items?: ICartItem[]; // Optional array of items to update in the cart
  gifts?: IGiftItem[]; // Optional array of gift items to update in the cart
}