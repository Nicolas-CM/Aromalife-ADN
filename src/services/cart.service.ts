// Import necessary models and interfaces
import { CartDocument, CartModel } from "../models";
import { CartInput, CartUpdateInput } from "../interfaces";
import { UserModel, CandleCustomizationModel, GiftModel } from "../models";

class CartService {
  // Method to create a new cart
  public async create(cartInput: CartInput): Promise<CartDocument> {
    try {
      // Check if the user exists
      const userExists = await UserModel.exists({ _id: cartInput.userId });
      if (!userExists) {
        throw new Error(`User with id ${cartInput.userId} does not exist`);
      }

      // Check if the candles exist
      for (const item of cartInput.items) {
        const candleExists = await CandleCustomizationModel.exists({
          _id: item.candleId,
        });
        if (!candleExists) {
          throw new Error(`Candle with id ${item.candleId} does not exist`);
        }
      }

      // Check if the gifts exist
      if (cartInput.gifts) {
        for (const item of cartInput.gifts) {
          const giftExists = await GiftModel.exists({ _id: item.giftId });
          if (!giftExists) {
            throw new Error(`Gift with id ${item.giftId} does not exist`);
          }
        }
      }

      // Create the cart and return it
      const cart: CartDocument = await CartModel.create(cartInput);
      return cart;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Method to retrieve all carts
  public async findAll(): Promise<CartDocument[]> {
    try {
      // Fetch all carts from the database
      const carts: CartDocument[] = await CartModel.find();
      return carts;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Method to retrieve a cart by its ID
  public async findById(id: string): Promise<CartDocument | null> {
    try {
      // Fetch the cart with the specified ID
      const cart: CartDocument | null = await CartModel.findById(id);
      return cart;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Method to update a cart by its ID
  public async update(
    id: string,
    cartInput: CartUpdateInput
  ): Promise<CartDocument | null> {
    try {
      // Check if the candles exist
      if (cartInput.items) {
        for (const item of cartInput.items) {
          const candleExists = await CandleCustomizationModel.exists({
            _id: item.candleId,
          });
          if (!candleExists) {
            throw new Error(`Candle with id ${item.candleId} does not exist`);
          }
        }
      }

      // Check if the gifts exist
      if (cartInput.gifts) {
        for (const item of cartInput.gifts) {
          const giftExists = await GiftModel.exists({ _id: item.giftId });
          if (!giftExists) {
            throw new Error(`Gift with id ${item.giftId} does not exist`);
          }
        }
      }

      // Update the cart and return the updated document
      const cart: CartDocument | null = await CartModel.findOneAndUpdate(
        { _id: id },
        cartInput,
        { returnOriginal: false }
      );
      return cart;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Method to delete a cart by its ID
  public async delete(id: string): Promise<CartDocument | null> {
    try {
      // Delete the cart with the specified ID
      const cart: CartDocument | null = await CartModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }
}

// Export an instance of the CartService class
export const cartService = new CartService();
