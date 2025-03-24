import { IContainer } from "./container.interface";
import { IFragrance } from "./fragrance.interface";
import { IUser } from "./user.interface";

// Interfaces para CandleCustomization

export interface ICandleCustomization {
  _id: string;
  userId: IUser["_id"]; // Referencia a User
  containerId: IContainer["_id"]; // Referencia a Container
  fragranceId: IFragrance["_id"]; // Referencia a Fragrance
  customImage: string;
  status?: "draft" | "completed"; // Estado opcional con valor por defecto
  aiMessage?: string;
  vrPreview?: string;
}

// Entrada de datos para creación y actualización
export interface CandleCustomizationInput {
  userId: IUser["_id"];
  containerId: IContainer["_id"];
  fragranceId: IFragrance["_id"];
  customImage: string;
  status?: "draft" | "completed";
  aiMessage?: string;
  vrPreview?: string;
}
