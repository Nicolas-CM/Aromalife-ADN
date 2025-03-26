// Importing mongoose library for MongoDB schema and model creation
import mongoose from "mongoose";

// Importing the ContainerInput interface for type definitions
import { ContainerInput } from "../interfaces";

// Defining the ContainerDocument interface
// This extends ContainerInput and includes mongoose.Document properties
export interface ContainerDocument extends ContainerInput, mongoose.Document {
  // Property for the creation date of the document
  createdAt: Date;
  // Property for the last update date of the document
  updatedAt: Date;
  // Property for the deletion date of the document
  deletedAt: Date;
}

// Defining the schema for the container
const containerSchema = new mongoose.Schema(
  {
    // Property for the name of the container, required, must be unique, and have a minimum length of 3
    name: { type: String, required: true, minlength: 3, unique: true },
    // Property for the description of the container, optional with a default value of an empty string
    description: { type: String, default: "" },
    // Property for the image URL of the container, required
    imageUrl: { type: String, required: true },
    // Property for the price of the container, required and must be a non-negative number
    price: { type: Number, required: true, min: 0 },
    // Property for the height of the container, required and must be a non-negative number
    height: { type: Number, required: true, min: 0 },
    // Property for the width of the container, required and must be a non-negative number
    width: { type: Number, required: true, min: 0 },
    // Property for the diameter of the container, optional and must be a non-negative number
    diameter: { type: Number, required: false, min: 0 },
  },
  // Schema options to include timestamps and specify the collection name
  { timestamps: true, collection: "containers" }
);

// Creating the Container model using the schema
export const ContainerModel = mongoose.model<ContainerDocument>(
  "Container", // Name of the model
  containerSchema // Schema used for the model
);