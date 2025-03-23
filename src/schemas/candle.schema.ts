import { z } from "zod";

// Esquema para crear una personalización
export const CandleCustomizationSchema = z.object({
  user: z.string().min(1),
  containerId: z.string().regex(/^[0-9a-fA-F]{24}$/), // Validar ObjectId de MongoDB
  fragranceId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  customImage: z.string().url(),
  aiMessage: z.string().optional(),
  vrPreview: z.string().url().optional(),
});