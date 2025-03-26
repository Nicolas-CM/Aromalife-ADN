// Import necessary models and interfaces
import {
  CandleCustomizationDocument,
  CandleCustomizationModel,
} from "../models";
import { CandleCustomizationInput, ICandleCustomization } from "../interfaces";
import { ContainerModel, FragranceModel, UserModel } from "../models";

// Define the CustomizationService class
class CustomizationService {
  // Create a new customization after validating that the container and fragrance exist
  public async create(
    data: CandleCustomizationInput
  ): Promise<CandleCustomizationDocument> {
    try {
      // Verify that the container exists
      const containerExists = await ContainerModel.findById(data.containerId);
      if (!containerExists) throw new ReferenceError("Not valid container");

      // Verify that the fragrance exists
      const fragranceExists = await FragranceModel.findById(data.fragranceId);
      if (!fragranceExists) throw new ReferenceError("Not valid fragrance");

      // Verify that the user exists
      const userExists = await UserModel.findById(data.userId);
      if (!userExists) throw new ReferenceError("Not valid user");

      // Create the customization
      const customization = await CandleCustomizationModel.create(data);
      return customization;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Retrieve a customization by ID with populated data
  public async findById(
    id: string
  ): Promise<CandleCustomizationDocument | null> {
    try {
      // Find the customization by ID
      const customization = await CandleCustomizationModel.findById(id);
      if (!customization) {
        // Throw an error if the customization is not found
        throw new ReferenceError("Personalization not found");
      } else {
        // Populate container and fragrance data
        (await customization.populate("containerId"))
          .populate("fragranceId");
        return customization;
      }
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Retrieve all customizations
  public async findAll(): Promise<CandleCustomizationDocument[]> {
    try {
      // Find all customizations
      const candles: CandleCustomizationDocument[] =
        await CandleCustomizationModel.find();
      return candles;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Update an existing customization
  public async update(
    id: string,
    data: Partial<ICandleCustomization>
  ): Promise<CandleCustomizationDocument | null> {
    try {
      // Find and update the customization by ID
      const customization = await CandleCustomizationModel.findByIdAndUpdate(
        id,
        data,
        { returnOriginal: false }
      );
      if (!customization) throw new ReferenceError("Personalization not found");
      return customization;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }

  // Delete a customization by ID
  public async delete(id: string): Promise<CandleCustomizationDocument | null> {
    try {
      // Find and delete the customization by ID
      const customization = await CandleCustomizationModel.findByIdAndDelete(
        id
      );
      if (!customization) throw new ReferenceError("Personalization not found");
      return customization;
    } catch (error) {
      // Handle and rethrow any errors
      throw error;
    }
  }
}

// Export an instance of the CustomizationService
export const candleCustomizationService = new CustomizationService();
