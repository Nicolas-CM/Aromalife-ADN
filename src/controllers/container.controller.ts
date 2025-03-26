// Importing necessary modules and types from external libraries and internal files
import { Request, Response } from "express"; 
import { ContainerDocument } from "../models"; 
import { ContainerInput } from "../interfaces"; 
import { containerService } from "../services"; 

// Defining the ContainerController class to handle container-related operations
class ContainerController {
  // Method to create a new container
  public async create(req: Request, res: Response) {
    try {
      // Extracting height and width from the request body
      const { height, width, ...rest } = req.body as ContainerInput; 
      // Calculating the diameter as the average of height and width
      const diameter = (height + width) / 2; 

      // Creating a new container using the service and request body
      const newContainer: ContainerDocument = await containerService.create({
        ...rest, 
        height,
        width,
        diameter, 
      });
      // Sending a 201 status with the created container as a response
      res.status(201).json(newContainer);
    } catch (error) {
      // Handling specific error when the container already exists
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Container already exists" });
        return;
      }
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve a specific container by its ID
  public async get(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
      // Finding the container by ID
      const container: ContainerDocument | null = await containerService.findById(id); 
      // If the container is not found, return a 404 status with an error message
      if (container === null) {
        res.status(404).json({ message: `Container with id ${id} not found` });
        return;
      }
      // Sending the found container as a response
      res.json(container);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve all containers
  public async getAll(req: Request, res: Response) {
    try {
      // Fetching all containers
      const containers: ContainerDocument[] = await containerService.findAll(); 
      // Sending the list of containers as a response
      res.json(containers);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to update an existing container by its ID
  public async update(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
      // Updating the container with the provided data
      const container: ContainerDocument | null = await containerService.update(
        id,
        req.body as ContainerInput 
      );
      // If the container is not found, return a 404 status with an error message
      if (container === null) {
        res.status(404).json({ message: `Container with id ${id} not found` });
        return;
      }
      // Sending the updated container as a response
      res.json(container);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to delete a container by its ID
  public async delete(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
      // Deleting the container by ID
      const container: ContainerDocument | null = await containerService.delete(id); 
      // If the container is not found, return a 404 status with an error message
      if (container === null) {
        res.status(404).json({ message: `Container with id ${id} not found` });
        return;
      }
      // Sending the deleted container as a response
      res.json(container);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }
}

// Exporting an instance of the ContainerController class for use in other parts of the application
export const containerController = new ContainerController();