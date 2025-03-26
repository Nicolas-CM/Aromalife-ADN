// Importing mongoose library for MongoDB schema and model creation
import mongoose from "mongoose";

// Importing the UserInput interface for type definitions
import { UserInput } from "../interfaces";

// Defining the UserDocument interface
// This extends UserInput and includes mongoose.Document properties
export interface UserDocument extends UserInput, mongoose.Document {
  // Property for the creation date of the document
  createdAt: Date;
  // Property for the last update date of the document
  updateAt: Date;
  // Property for the deletion date of the document
  deleteAt: Date;
}

// Defining the schema for the user
const userSchema = new mongoose.Schema(
  {
    // Property for the name of the user, required
    name: { type: String, required: true },
    // Property for the email of the user, required, indexed, and must be unique
    email: { type: String, required: true, index: true, unique: true },
    // Property for the password of the user, required
    password: { type: String, required: true },
    // Property for the age of the user, required
    age: { type: Number, required: true },
    // Property for the roles of the user, must be an array of predefined values
    roles: { type: [String], enum: ["client", "superadmin", "manager"] },
  },
  // Schema options to include timestamps and specify the collection name
  { timestamps: true, collection: "users" }
);

// Creating the User model using the schema
export const UserModel = mongoose.model<UserDocument>(
  "User", // Name of the model
  userSchema // Schema used for the model
);