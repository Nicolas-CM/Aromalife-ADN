import { CandleCustomizationDocument, CandleCustomizationModel } from "../models";
import { ICandleCustomization } from "../interfaces";
import { ContainerModel, ContainerDocument } from "../models";
import { FragranceModel, FragranceDocument } from "../models";

class CustomizationService {
    // Crear personalización validando que existan container y fragancia
    public async create(data: ICandleCustomization): Promise<CandleCustomizationDocument> {
        try {
            // Verificar que el contenedor existe
            const containerExists = await ContainerModel.findById(data.containerId);
            if (!containerExists) throw new ReferenceError("Contenedor no válido");

            // Verificar que la fragancia existe
            const fragranceExists = await FragranceModel.findById(data.fragranceId);
            if (!fragranceExists) throw new ReferenceError("Fragancia no válida");

            const customization = await CandleCustomizationModel.create(data);
            return customization;
        } catch (error) {
            throw error;
        }
    }

    // Obtener personalización con datos poblados
    public async findById(id: string): Promise<CandleCustomizationDocument | null> {
        try {
            const customization = await CandleCustomizationModel.findById(id)
                .populate("containerId") // Trae los datos del contenedor
                .populate("fragranceId"); // Trae los datos de la fragancia

            if (!customization) throw new ReferenceError("Personalización no encontrada");
            return customization;
        } catch (error) {
            throw error;
        }
    }

    // 
    public async findAll(): Promise<CandleCustomizationDocument[]> {
        try {
            const candles: CandleCustomizationDocument[] = await CandleCustomizationModel.find();
            return candles;
        } catch (error) {
            throw error;
        }
    }


    // Actualizar personalización
    public async update(id: string, data: Partial<ICandleCustomization>): Promise<CandleCustomizationDocument | null> {
        try {
            const customization = await CandleCustomizationModel.findByIdAndUpdate(
                id,
                data,
                { returnOriginal: false }
            );
            if (!customization) throw new ReferenceError("Personalización no encontrada");
            return customization;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar personalización
    public async delete(id: string): Promise<CandleCustomizationDocument | null> {
        try {
            const customization = await CandleCustomizationModel.findByIdAndDelete(id);
            if (!customization) throw new ReferenceError("Personalización no encontrada");
            return customization;
        } catch (error) {
            throw error;
        }
    }
}

export const candleCustomizationService = new CustomizationService();

