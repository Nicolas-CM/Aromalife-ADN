import {IContainer, IFragrance} from "./index";
  // Personalización del usuario (selección + datos adicionales)
  export interface ICandleCustomization {
    user: string; // ID del usuario
    containerId: IContainer["_id"]; // REFERENCIA a contenedor existente
    fragranceId: IFragrance["_id"]; // REFERENCIA a fragancia existente
    customImage: string; // URL de imagen subida
    status: "draft" | "completed";
    aiMessage?: string; // Mensaje generado por IA
    vrPreview?: string; // URL de vista previa VR
  }