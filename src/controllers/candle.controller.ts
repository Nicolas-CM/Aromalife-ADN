import { Request, Response } from "express";
import { CandleCustomizationDocument } from "../models";
import { CandleCustomizationInput } from "../interfaces";
import { candleCustomizationService } from "../services";

class CandleCustomizationController {
  public async create(req: Request, res: Response) {
    try {
      const newCustomization: CandleCustomizationDocument = await candleCustomizationService.create(
        req.body as CandleCustomizationInput
      );
      res.status(201).json(newCustomization);
    } catch (error) {
      if (error instanceof ReferenceError) {
        res.status(400).json({ message: "Customization already exists" });
        return;
      }
      res.status(500).json(error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const customization: CandleCustomizationDocument | null = await candleCustomizationService.findById(id);
      if (customization === null) {
        res.status(404).json({ message: `Customization with id ${id} not found` });
        return;
      }
      res.json(customization);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      const customizations: CandleCustomizationDocument[] = await candleCustomizationService.findAll();
      res.json(customizations);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const customization: CandleCustomizationDocument | null = await candleCustomizationService.update(
        id,
        req.body as CandleCustomizationInput
      );
      if (customization === null) {
        res.status(404).json({ message: `Customization with id ${id} not found` });
        return;
      }
      res.json(customization);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const customization: CandleCustomizationDocument | null = await candleCustomizationService.delete(id);
      if (customization === null) {
        res.status(404).json({ message: `Customization with id ${id} not found` });
        return;
      }
      res.json(customization);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const candleCustomizationController = new CandleCustomizationController();
