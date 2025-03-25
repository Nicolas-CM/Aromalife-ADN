import { FragranceDocument, FragranceModel } from "../models";
import { FragranceInput, FragranceUpdateInput } from "../interfaces";

class FragranceService {
  public async create(fragranceInput: FragranceInput): Promise<FragranceDocument> {
    try {

      const fragranceExists: FragranceDocument | null = await this.findByName(fragranceInput.name);
                  if (fragranceExists != null) {
                    throw new ReferenceError("Fragrance already exists");
                  }

      const fragrance: FragranceDocument = await FragranceModel.create(fragranceInput);
      return fragrance;
    } catch (error) {
      throw error;
    }
  }

  public async findByName(name: string): Promise<FragranceDocument | null> {
        try {
          const fragrance = await FragranceModel.findOne({ name });
          return fragrance;
        } catch (error) {
          throw error;
        }
      }

  public async findAll(): Promise<FragranceDocument[]> {
    try {
      const fragrances: FragranceDocument[] = await FragranceModel.find();
      return fragrances;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<FragranceDocument | null> {
    try {
      const fragrance: FragranceDocument | null = await FragranceModel.findById(id);
      return fragrance;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, fragranceInput: FragranceUpdateInput): Promise<FragranceDocument | null> {
    try {
      const fragrance: FragranceDocument | null = await FragranceModel.findOneAndUpdate(
        { _id: id },
        fragranceInput,
        { returnOriginal: false }
      );
      return fragrance;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<FragranceDocument | null> {
    try {
      const fragrance: FragranceDocument | null = await FragranceModel.findByIdAndDelete(id);
      return fragrance;
    } catch (error) {
      throw error;
    }
  }
}

export const fragranceService = new FragranceService();
