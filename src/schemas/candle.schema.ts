import { object, string, enum as zodEnum } from "zod";

export const candleCustomizationSchema = object({
  userId: string({ required_error: "User ID is required" }),
  containerId: string({ required_error: "Container ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/,
    "Invalid ObjectId format"
  ),
  fragranceId: string({ required_error: "Fragrance ID is required" }).regex(
    /^[a-fA-F0-9]{24}$/,
    "Invalid ObjectId format"
  ),
  customImage: string({ required_error: "Custom image URL is required" }).url(
    "Invalid URL format"
  ),
  status: zodEnum(["draft", "completed"], {
    errorMap: () => ({ message: "Status must be 'draft' or 'completed'" }),
  }),
  aiMessage: string().optional(),
  vrPreview: string().optional(),
});
