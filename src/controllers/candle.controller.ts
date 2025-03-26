// Import the Request and Response interfaces from Express.
import { Request, Response } from "express";

// Import the candle customization document model.
import { CandleCustomizationDocument } from "../models";

// Import the input interface for candle customization.
import { CandleCustomizationInput } from "../interfaces";

// Import the candle customization service.
import { candleCustomizationService } from "../services";

// Define the CandleCustomizationController class to handle operations related to candle customizations.
class CandleCustomizationController {
  // Define a method to create a new candle customization.
  public async create(req: Request, res: Response) {
    try {
      // Call the service to create a new customization.
      const newCustomization: CandleCustomizationDocument =
        await candleCustomizationService.create(
          req.body as CandleCustomizationInput
        );

      // Return the new customization with a 201 status code.
      res.status(201).json(newCustomization);
    } catch (error) {
      // If a reference error occurs, return an error message with a 400 status code.
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Customization already exists" });
        return;
      }

      // If another error occurs, return a 500 status code.
      res.status(500).json(error);
    }
  }

  // Define a method to get a candle customization by its ID.
  public async get(req: Request, res: Response) {
    try {
      // Get the ID from the request parameters.
      const id: string = req.params.id;

      // Call the service to find the customization by ID.
      const customization: CandleCustomizationDocument | null =
        await candleCustomizationService.findById(id);

      // If the customization is not found, return an error message with a 404 status code.
      if (customization === null) {
        res
          .status(404)
          .json({ message: `Customization with id ${id} not found` });
        return;
      }

      // Return the found customization.
      res.json(customization);
    } catch (error) {
      // If an error occurs, return a 500 status code.
      res.status(500).json(error);
    }
  }

  // Define a method to get all candle customizations.
  public async getAll(req: Request, res: Response) {
    try {
      // Call the service to get all customizations.
      const customizations: CandleCustomizationDocument[] =
        await candleCustomizationService.findAll();

      // Return all customizations.
      res.json(customizations);
    } catch (error) {
      // If an error occurs, return a 500 status code.
      res.status(500).json(error);
    }
  }

  // Define a method to update a candle customization by its ID.
  public async update(req: Request, res: Response) {
    try {
      // Get the ID from the request parameters.
      const id: string = req.params.id;

      // Call the service to update the customization.
      const customization: CandleCustomizationDocument | null =
        await candleCustomizationService.update(
          id,
          req.body as CandleCustomizationInput
        );

      // If the customization is not found, return an error message with a 404 status code.
      if (customization === null) {
        res
          .status(404)
          .json({ message: `Customization with id ${id} not found` });
        return;
      }

      // Return the updated customization.
      res.json(customization);
    } catch (error) {
      // If an error occurs, return a 500 status code.
      res.status(500).json(error);
    }
  }

  // Define a method to delete a candle customization by its ID.
  public async delete(req: Request, res: Response) {
    try {
      // Get the ID from the request parameters.
      const id: string = req.params.id;

      // Call the service to delete the customization.
      const customization: CandleCustomizationDocument | null =
        await candleCustomizationService.delete(id);

      // If the customization is not found, return an error message with a 404 status code.
      if (customization === null) {
        res
          .status(404)
          .json({ message: `Customization with id ${id} not found` });
        return;
      }

      // Return the deleted customization.
      res.json(customization);
    } catch (error) {
      // If an error occurs, return a 500 status code.
      res.status(500).json(error);
    }
  }
}

// Export an instance of the CandleCustomizationController class.
export const candleCustomizationController =
  new CandleCustomizationController();
