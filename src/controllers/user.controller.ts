// Importing necessary modules and types from external libraries and internal files
import { Request, Response } from "express"; // Express types for handling HTTP requests and responses
import { UserDocument } from "../models"; // UserDocument type from the models
import { UserInput, UserLogin } from "../interfaces"; // UserInput and UserLogin types from the interfaces
import { userService } from "../services"; // User service for handling business logic
import { AuthError } from "../exceptions"; // Custom exception for authentication errors

// Defining the UserController class to handle user-related operations
class Usercontroller {
  // Method to create a new user
  public async create(req: Request, res: Response) {
    try {
      // Creating a new user using the service and request body
      const newUser: UserDocument = await userService.create(
        req.body as UserInput
      );
      // Sending a 201 status with the created user as a response
      res.status(201).json(newUser);
    } catch (error) {
      // Handling specific error when the user already exists
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve a specific user by their ID
  public async get(req: Request, res: Response) {
    try {
      const id: string = req.params.id; // Extracting the ID from the request parameters
      const user: UserDocument | null = await userService.findById(id); // Finding the user by ID
      if (user === null) {
        // If the user is not found, return a 404 status with an error message
        res.status(404).json({ message: `User with id ${id} not found` });
        return;
      }
      // Sending the found user as a response
      res.json(user);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to retrieve all users
  public async getAll(req: Request, res: Response) {
    try {
      const users: UserDocument[] = await userService.findAll(); // Fetching all users
      // Sending the list of users as a response
      res.json(users);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to update an existing user by their ID
  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id; // Extracting the ID from the request parameters
      const user: UserDocument | null = await userService.update(
        id,
        req.body as UserInput // Updating the user with the provided data
      );
      if (user === null) {
        // If the user is not found, return a 404 status with an error message
        res.status(404).json({ message: `User with id ${id} not found` });
        return;
      }
      // Sending the updated user as a response
      res.json(user);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to delete a user by their ID
  public async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id; // Extracting the ID from the request parameters
      console.log(id); // Logging the ID for debugging purposes
      const user: UserDocument | null = await userService.delete(id); // Deleting the user by ID
      if (user === null) {
        // If the user is not found, return a 404 status with an error message
        res.status(404).json({ message: `User with id ${id} not found` });
        return;
      }
      // Sending the deleted user as a response
      res.json(user);
    } catch (error) {
      // Handling generic server errors
      res.status(500).json(error);
    }
  }

  // Method to handle user login
  public async login(req: Request, res: Response) {
    try {
      const resObj = await userService.login(req.body as UserLogin); // Authenticating the user
      // Sending a 200 status with the authentication result as a response
      res.status(200).json(resObj);
    } catch (error) {
      // Handling authentication errors
      if (error instanceof AuthError) {
        res.status(401).json({ message: error.message }); // Sending a 401 status for unauthorized access
        return;
      }
      // Handling generic server errors
      res.status(500).json(error);
    }
  }
}

// Exporting an instance of the UserController class for use in other parts of the application
export const userController = new Usercontroller();