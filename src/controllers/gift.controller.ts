// Importing necessary modules and types from external libraries and internal files
import { Request, Response } from "express"; 
import { GiftDocument } from "../models"; 
import { GiftInput } from "../interfaces"; 
import { giftService } from "../services"; 

// Defining the GiftController class to handle gift-related operations
class GiftController {
  // Method to create a new gift
  public async create(req: Request, res: Response) {
    try {
      // Creating a new gift using the service and request body
      const newGift: GiftDocument = await giftService.create(req.body as GiftInput);
      // Sending a 201 status with the created gift as a response
      res.status(201).json(newGift);
    } catch (error) {
      // Handling specific error when the gift already exists
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Gift already exists" });
        return;
      }
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve a specific gift by its ID
  public async get(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
      // Finding the gift by ID
      const gift: GiftDocument | null = await giftService.findById(id); 
      // If the gift is not found, return a 404 status with an error message
      if (gift === null) {
        res.status(404).json({ message: `Gift with id ${id} not found` });
        return;
      }
      // Sending the found gift as a response
      res.json(gift);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve all gifts
  public async getAll(req: Request, res: Response) {
    try {
      // Fetching all gifts
      const gifts: GiftDocument[] = await giftService.findAll(); 
      // Sending the list of gifts as a response
      res.json(gifts);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to update an existing gift by its ID
  public async update(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
      // Updating the gift with the provided data
      const gift: GiftDocument | null = await giftService.update(
        id,
        req.body as Partial<GiftInput> 
      );
      // If the gift is not found, return a 404 status with an error message
      if (gift === null) {
        res.status(404).json({ message: `Gift with id ${id} not found` });
        return;
      }
      // Sending the updated gift as a response
      res.json(gift);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to delete a gift by its ID
  public async delete(req: Request, res: Response) {
    try {
      // Extracting the ID from the request parameters
      const id: string = req.params.id; 
      // Deleting the gift by ID
      const gift: GiftDocument | null = await giftService.delete(id); 
      // If the gift is not found, return a 404 status with an error message
      if (gift === null) {
        res.status(404).json({ message: `Gift with id ${id} not found` });
        return;
      }
      // Sending a success message as a response
      res.json({ message: "Gift deleted successfully" });
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }
}

// Exporting an instance of the GiftController class for use in other parts of the application
export const giftController = new GiftController();