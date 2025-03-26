// Importing necessary modules and types from external libraries and internal files
import { Request, Response } from "express"; // Express types for handling HTTP requests and responses
import { FragranceDocument } from "../models"; // FragranceDocument type from the models
import { FragranceInput } from "../interfaces"; // FragranceInput type from the interfaces
import { fragranceService } from "../services"; // Fragrance service for handling business logic

// Defining the FragranceController class to handle fragrance-related operations
class FragranceController {
  // Method to create a new fragrance
  public async create(req: Request, res: Response) {
    try {
      // Creating a new fragrance using the service and request body
      const newFragrance: FragranceDocument = await fragranceService.create(
        req.body as FragranceInput
      );
      // Sending a 201 status with the created fragrance as a response
      res.status(201).json(newFragrance);
    } catch (error) {
      // Handling specific error when the fragrance already exists
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Fragrance already exists" });
        return;
      }
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve a specific fragrance by its ID
  public async get(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
      // Finding the fragrance by ID
      const fragrance: FragranceDocument | null = await fragranceService.findById(id); 
      if (fragrance === null) {
        // If the fragrance is not found, return a 404 status with an error message
        res.status(404).json({ message: `Fragrance with id ${id} not found` });
        return;
      }
      // Sending the found fragrance as a response
      res.json(fragrance);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve all fragrances
  public async getAll(req: Request, res: Response) {
    try {
      // Fetching all fragrances
      const fragrances: FragranceDocument[] = await fragranceService.findAll(); 
      // Sending the list of fragrances as a response
      res.json(fragrances);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to update an existing fragrance by its ID
  public async update(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id;
      const fragrance: FragranceDocument | null = await fragranceService.update(
        id,
        // Updating the fragrance with the provided data
        req.body as FragranceInput
      );
      if (fragrance === null) {
        // If the fragrance is not found, return a 404 status with an error message
        res.status(404).json({ message: `Fragrance with id ${id} not found` });
        return;
      }
      // Sending the updated fragrance as a response
      res.json(fragrance);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to delete a fragrance by its ID
  public async delete(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
       // Deleting the fragrance by ID
      const fragrance: FragranceDocument | null = await fragranceService.delete(id);
      if (fragrance === null) {
        // If the fragrance is not found, return a 404 status with an error message
        res.status(404).json({ message: `Fragrance with id ${id} not found` });
        return;
      }
      // Sending the deleted fragrance as a response
      res.json(fragrance);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }
}

// Exporting an instance of the FragranceController class for use in other parts of the application
export const fragranceController = new FragranceController();