// Importing related interfaces for dependencies
import { IContainer } from "./container.interface"; // Interface for Container
import { IFragrance } from "./fragrance.interface"; // Interface for Fragrance
import { IUser } from "./user.interface"; // Interface for User

// Interfaces for CandleCustomization

// Main interface representing a candle customization
export interface ICandleCustomization {
  _id: string; // Unique identifier for the customization
  userId: IUser["_id"]; // Reference to the User who created the customization
  containerId: IContainer["_id"]; // Reference to the Container used
  fragranceId: IFragrance["_id"]; // Reference to the Fragrance used
  customImage: string; // URL or path to the custom image
  status?: "draft" | "completed"; // Optional status of the customization
  aiMessage?: string; // Optional AI-generated message
  vrPreview?: string; // Optional VR preview URL or data
}

// Input interface for creating or updating a candle customization
export interface CandleCustomizationInput {
  userId: IUser["_id"]; // Reference to the User
  containerId: IContainer["_id"]; // Reference to the Container
  fragranceId: IFragrance["_id"]; // Reference to the Fragrance
  customImage: string; // URL or path to the custom image
  status?: "draft" | "completed"; // Optional status of the customization
  aiMessage?: string; // Optional AI-generated message
  vrPreview?: string; // Optional VR preview URL or data
}