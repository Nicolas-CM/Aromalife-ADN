// Import necessary types and models for the service
import { FragranceDocument, FragranceModel } from "../models";
import { FragranceInput, FragranceUpdateInput } from "../interfaces";

class FragranceService {
  // Method to create a new fragrance
  public async create(fragranceInput: FragranceInput): Promise<FragranceDocument> {
    try {
      // Check if a fragrance with the same name already exists
      const fragranceExists: FragranceDocument | null = await this.findByName(fragranceInput.name);
      if (fragranceExists != null) {
        // Throw an error if the fragrance already exists
        throw new ReferenceError("Fragrance already exists");
      }

      // Create a new fragrance document in the database
      const fragrance: FragranceDocument = await FragranceModel.create(fragranceInput);
      return fragrance;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to find a fragrance by its name
  public async findByName(name: string): Promise<FragranceDocument | null> {
    try {
      // Search for a fragrance document with the specified name
      const fragrance = await FragranceModel.findOne({ name });
      return fragrance;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to retrieve all fragrances
  public async findAll(): Promise<FragranceDocument[]> {
    try {
      // Fetch all fragrance documents from the database
      const fragrances: FragranceDocument[] = await FragranceModel.find();
      return fragrances;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to find a fragrance by its ID
  public async findById(id: string): Promise<FragranceDocument | null> {
    try {
      // Search for a fragrance document with the specified ID
      const fragrance: FragranceDocument | null = await FragranceModel.findById(id);
      return fragrance;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to update an existing fragrance
  public async update(id: string, fragranceInput: FragranceUpdateInput): Promise<FragranceDocument | null> {
    try {
      // Find and update the fragrance document with the specified ID
      const fragrance: FragranceDocument | null = await FragranceModel.findOneAndUpdate(
        { _id: id },
        fragranceInput,
        { returnOriginal: false } // Return the updated document
      );
      return fragrance;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to delete a fragrance by its ID
  public async delete(id: string): Promise<FragranceDocument | null> {
    try {
      // Find and delete the fragrance document with the specified ID
      const fragrance: FragranceDocument | null = await FragranceModel.findByIdAndDelete(id);
      return fragrance;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }
}

// Export an instance of the FragranceService class
export const fragranceService = new FragranceService();
