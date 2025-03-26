// Importing necessary types and models from other files
import { ContainerDocument, ContainerModel } from "../models";
import { ContainerInput, ContainerUpdateInput } from "../interfaces";

class ContainerService {
  // Method to create a new container
  public async create(containerInput: ContainerInput): Promise<ContainerDocument> {
    try {
      // Check if a container with the same name already exists
      const containerExists: ContainerDocument | null = await this.findByName(containerInput.name);
      if (containerExists != null) {
        // Throw an error if the container already exists
        throw new ReferenceError("Container already exists");
      }

      // Create a new container in the database
      const container: ContainerDocument = await ContainerModel.create(containerInput);
      return container;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to find a container by its name
  public async findByName(name: string): Promise<ContainerDocument | null> {
    try {
      // Search for a container with the specified name
      const container = await ContainerModel.findOne({ name });
      return container;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to retrieve all containers
  public async findAll(): Promise<ContainerDocument[]> {
    try {
      // Fetch all containers from the database
      const containers: ContainerDocument[] = await ContainerModel.find();
      return containers;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to find a container by its ID
  public async findById(id: string): Promise<ContainerDocument | null> {
    try {
      // Search for a container with the specified ID
      const container: ContainerDocument | null = await ContainerModel.findById(id);
      return container;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to update a container by its ID
  public async update(id: string, containerInput: ContainerUpdateInput): Promise<ContainerDocument | null> {
    try {
      // Update the container with the specified ID and return the updated document
      const container: ContainerDocument | null = await ContainerModel.findOneAndUpdate(
        { _id: id },
        containerInput,
        { returnOriginal: false } // Return the updated document instead of the original
      );
      return container;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to delete a container by its ID
  public async delete(id: string): Promise<ContainerDocument | null> {
    try {
      // Delete the container with the specified ID
      const container: ContainerDocument | null = await ContainerModel.findByIdAndDelete(id);
      return container;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }
}

// Exporting an instance of the ContainerService class
export const containerService = new ContainerService();
