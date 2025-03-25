import { CartDocument, CartModel } from "../models";
import { CartInput, CartUpdateInput } from "../interfaces";
import { UserModel, CandleCustomizationModel, GiftModel } from "../models";

class CartService {
  public async create(cartInput: CartInput): Promise<CartDocument> {
    try {
      // Verificar si el usuario existe
      const userExists = await UserModel.exists({ _id: cartInput.userId });
      if (!userExists) {
        throw new Error(`User with id ${cartInput.userId} does not exist`);
      }

      // Verificar si los productos existen
      for (const item of cartInput.items) {
        const candleExists = await CandleCustomizationModel.exists({
          _id: item.candleId,
        });
        if (!candleExists) {
          throw new Error(`Candle with id ${item.candleId} does not exist`);
        }
      }

      // Verificar si los regalos existen
      if (cartInput.gifts) {
        for (const item of cartInput.gifts) {
          const giftExists = await GiftModel.exists({ _id: item.giftId });
          if (!giftExists) {
            throw new Error(`Gift with id ${item.giftId} does not exist`);
          }
        }
      }

      const cart: CartDocument = await CartModel.create(cartInput);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<CartDocument[]> {
    try {
      const carts: CartDocument[] = await CartModel.find();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<CartDocument | null> {
    try {
      const cart: CartDocument | null = await CartModel.findById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  public async update(
    id: string,
    cartInput: CartUpdateInput
  ): Promise<CartDocument | null> {
    try {
      // Verificar si los productos existen
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

      // Verificar si los regalos existen
      if (cartInput.gifts) {
        for (const item of cartInput.gifts) {
          const giftExists = await GiftModel.exists({ _id: item.giftId });
          if (!giftExists) {
            throw new Error(`Gift with id ${item.giftId} does not exist`);
          }
        }
      }

      const cart: CartDocument | null = await CartModel.findOneAndUpdate(
        { _id: id },
        cartInput,
        { returnOriginal: false }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<CartDocument | null> {
    try {
      const cart: CartDocument | null = await CartModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

export const cartService = new CartService();
