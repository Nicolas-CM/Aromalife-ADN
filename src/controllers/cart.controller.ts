// Importing necessary modules and types from external libraries and internal files
import { Request, Response } from "express";
import { CartDocument } from "../models";
import { CartInput, CartUpdateInput } from "../interfaces";
import { cartService } from "../services";

// Defining the CartController class to handle cart-related operations
class CartController {
  // Method to create a new cart
  public async create(req: Request, res: Response) {
    // Try block to handle the creation of a new cart
    try {
      // Creating a new cart using the cartService and request body
      const newCart: CartDocument = await cartService.create(
        req.body as CartInput
      );
      // Sending a 201 status with the created cart as a response
      res.status(201).json(newCart);
    } catch (error) {
      // Catch block to handle errors during cart creation
      // Logging the error and sending a 400 status with the error as a response
      console.log(error);
      res.status(400).json(error);
    }
  }

  // Method to get a specific cart by its ID
  public async get(req: Request, res: Response) {
    // Try block to handle fetching a cart by ID
    try {
      // Extracting the cart ID from the request parameters
      const id: string = req.params.id;
      // Finding the cart by ID using the cartService
      const cart: CartDocument | null = await cartService.findById(id);
      // If the cart is not found, send a 404 status with an error message
      if (cart === null) {
        res.status(404).json({ message: `Cart with id ${id} not found` });
        return;
      }
      // Sending the found cart as a response
      res.json(cart);
    } catch (error) {
      // Catch block to handle errors during fetching
      // Sending a 500 status with the error as a response
      res.status(500).json(error);
    }
  }

  // Method to get all carts
  public async getAll(req: Request, res: Response) {
    // Try block to handle fetching all carts
    try {
      // Retrieving all carts using the cartService
      const carts: CartDocument[] = await cartService.findAll();
      // Sending the list of carts as a response
      res.json(carts);
    } catch (error) {
      // Catch block to handle errors during fetching
      // Sending a 500 status with the error as a response
      res.status(500).json(error);
    }
  }

  // Method to update a specific cart by its ID
  public async update(req: Request, res: Response) {
    // Try block to handle updating a cart by ID
    try {
      // Extracting the cart ID from the request parameters
      const id: string = req.params.id;
      // Updating the cart using the cartService and request body
      const cart: CartDocument | null = await cartService.update(
        id,
        req.body as CartUpdateInput
      );
      // If the cart is not found, send a 404 status with an error message
      if (cart === null) {
        res.status(404).json({ message: `Cart with id ${id} not found` });
        return;
      }
      // Sending the updated cart as a response
      res.json(cart);
    } catch (error) {
      // Catch block to handle errors during updating
      // Sending a 400 status with the error as a response
      res.status(400).json(error);
    }
  }

  // Method to delete a specific cart by its ID
  public async delete(req: Request, res: Response) {
    // Try block to handle deleting a cart by ID
    try {
      // Extracting the cart ID from the request parameters
      const id: string = req.params.id;
      // Deleting the cart using the cartService
      const cart: CartDocument | null = await cartService.delete(id);
      // If the cart is not found, send a 404 status with an error message
      if (cart === null) {
        res.status(404).json({ message: `Cart with id ${id} not found` });
        return;
      }
      // Sending the deleted cart as a response
      res.json(cart);
    } catch (error) {
      // Catch block to handle errors during deletion
      // Sending a 500 status with the error as a response
      res.status(500).json(error);
    }
  }
}

// Exporting an instance of the CartController class for use in other parts of the application
export const cartController = new CartController();
