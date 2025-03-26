// Importing the GiftDocument and GiftModel from the models directory
// Importing the GiftInput interface from the interfaces directory
import { GiftDocument, GiftModel } from "../models";
import { GiftInput } from "../interfaces";

// Defining the GiftService class
class GiftService {
  // Method to create a new gift document in the database
  public async create(giftInput: GiftInput): Promise<GiftDocument> {
    try {
      // Creating a new gift document using the GiftModel
      const gift: GiftDocument = await GiftModel.create(giftInput);
      return gift;
    } catch (error) {
      // Throwing an error if the operation fails
      throw error;
    }
  }

  // Method to retrieve all gift documents from the database
  public async findAll(): Promise<GiftDocument[]> {
    try {
      // Fetching all gift documents using the GiftModel
      const gifts: GiftDocument[] = await GiftModel.find();
      return gifts;
    } catch (error) {
      // Throwing an error if the operation fails
      throw error;
    }
  }

  // Method to find a specific gift document by its ID
  public async findById(id: string): Promise<GiftDocument | null> {
    try {
      // Fetching a gift document by its ID using the GiftModel
      const gift: GiftDocument | null = await GiftModel.findById(id);
      return gift;
    } catch (error) {
      // Throwing an error if the operation fails
      throw error;
    }
  }

  // Method to update a specific gift document by its ID
  public async update(id: string, giftInput: Partial<GiftInput>): Promise<GiftDocument | null> {
    try {
      // Updating a gift document and returning the updated document
      const gift: GiftDocument | null = await GiftModel.findOneAndUpdate(
        { _id: id },
        giftInput,
        { returnOriginal: false }
      );
      return gift;
    } catch (error) {
      // Throwing an error if the operation fails
      throw error;
    }
  }

  // Method to delete a specific gift document by its ID
  public async delete(id: string): Promise<GiftDocument | null> {
    try {
      // Deleting a gift document by its ID using the GiftModel
      const gift: GiftDocument | null = await GiftModel.findByIdAndDelete(id);
      return gift;
    } catch (error) {
      // Throwing an error if the operation fails
      throw error;
    }
  }
}

// Exporting an instance of the GiftService class
export const giftService = new GiftService();
