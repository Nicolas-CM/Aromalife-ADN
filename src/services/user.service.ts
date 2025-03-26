// Import necessary modules and types
import { UserDocument, UserModel } from "../models";
import {
  UserInput,
  UserInputUpdate,
  UserLogin,
  UserLoginResponse,
} from "../interfaces";
import { AuthError } from "../exceptions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the UserService class
class UserService {
  // Method to create a new user
  public async create(userInput: UserInput): Promise<UserDocument> {
    try {
      // Check if a user with the given email already exists
      const userExists: UserDocument | null = await this.findByEmail(
        userInput.email
      );
      if (userExists != null) {
        // Throw an error if the user already exists
        throw new ReferenceError("User already exists");
      }
      // Hash the user's password if provided
      if (userInput.password)
        userInput.password = await bcrypt.hash(userInput.password, 10);

      // Create and return the new user
      const user: UserDocument = await UserModel.create(userInput);
      return user;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to find a user by their email
  public async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      // Search for the user in the database
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to retrieve all users
  public async findAll(): Promise<UserDocument[]> {
    try {
      // Fetch all users from the database
      const users: UserDocument[] = await UserModel.find();
      return users;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to find a user by their ID
  public async findById(id: string): Promise<UserDocument | null> {
    try {
      // Search for the user by ID in the database
      const user: UserDocument | null = await UserModel.findById(id);
      return user;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to update a user's information
  public async update(
    id: string,
    userInput: UserInputUpdate
  ): Promise<UserDocument | null> {
    try {
      // Find and update the user by ID
      const user: UserDocument | null = await UserModel.findOneAndUpdate(
        { _id: id },
        userInput,
        { returnOriginal: false }
      );
      // Clear the password field in the returned user object
      if (user) user.password = "";
      return user;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to delete a user by their ID
  public async delete(id: string): Promise<UserDocument | null> {
    try {
      // Find and delete the user by ID
      const user: UserDocument | null = await UserModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to handle user login
  public async login(
    userLogin: UserLogin
  ): Promise<UserLoginResponse | undefined> {
    try {
      // Check if a user with the given email exists
      const userExists: UserDocument | null = await this.findByEmail(
        userLogin.email
      );
      if (userExists === null) {
        // Throw an error if the user does not exist
        throw new AuthError("User or password incorrect");
      }
      // Compare the provided password with the stored hashed password
      const isMatch: boolean = await bcrypt.compare(
        userLogin.password,
        userExists.password
      );
      if (!isMatch) {
        // Throw an error if the passwords do not match
        throw new AuthError("User or password incorrect");
        console.log("No hacen match");
      }
      // Return the user information and a generated token
      return {
        user: {
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
          roles: userExists.roles,
          token: this.generateToken(userExists),
          age: userExists.age,
        },
      };
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }

  // Method to generate a JWT token for a user
  public generateToken(user: UserDocument): string {
    try {
      // Sign and return the JWT token
      return jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles,
          },
        },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "10m" }
      );
    } catch (error) {
      // Rethrow any errors encountered
      throw error;
    }
  }
}

// Export an instance of the UserService class
export const userService = new UserService();
