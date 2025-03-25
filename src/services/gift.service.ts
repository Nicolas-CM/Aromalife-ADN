import { GiftDocument, GiftModel } from "../models";
import { GiftInput } from "../interfaces";

class GiftService {
  public async create(giftInput: GiftInput): Promise<GiftDocument> {
    try {
      const gift: GiftDocument = await GiftModel.create(giftInput);
      return gift;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<GiftDocument[]> {
    try {
      const gifts: GiftDocument[] = await GiftModel.find();
      return gifts;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<GiftDocument | null> {
    try {
      const gift: GiftDocument | null = await GiftModel.findById(id);
      return gift;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, giftInput: Partial<GiftInput>): Promise<GiftDocument | null> {
    try {
      const gift: GiftDocument | null = await GiftModel.findOneAndUpdate(
        { _id: id },
        giftInput,
        { returnOriginal: false }
      );
      return gift;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<GiftDocument | null> {
    try {
      const gift: GiftDocument | null = await GiftModel.findByIdAndDelete(id);
      return gift;
    } catch (error) {
      throw error;
    }
  }
}

export const giftService = new GiftService();
