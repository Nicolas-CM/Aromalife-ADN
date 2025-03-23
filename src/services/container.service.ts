import { ContainerDocument, ContainerModel } from "../models";
import { ContainerInput, ContainerUpdateInput } from "../interfaces";

class ContainerService {
  public async create(containerInput: ContainerInput): Promise<ContainerDocument> {
    try {
      const container: ContainerDocument = await ContainerModel.create(containerInput);
      return container;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<ContainerDocument[]> {
    try {
      const containers: ContainerDocument[] = await ContainerModel.find();
      return containers;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<ContainerDocument | null> {
    try {
      const container: ContainerDocument | null = await ContainerModel.findById(id);
      return container;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, containerInput: ContainerUpdateInput): Promise<ContainerDocument | null> {
    try {
      const container: ContainerDocument | null = await ContainerModel.findOneAndUpdate(
        { _id: id },
        containerInput,
        { returnOriginal: false }
      );
      return container;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<ContainerDocument | null> {
    try {
      const container: ContainerDocument | null = await ContainerModel.findByIdAndDelete(id);
      return container;
    } catch (error) {
      throw error;
    }
  }
}

export const containerService = new ContainerService();
