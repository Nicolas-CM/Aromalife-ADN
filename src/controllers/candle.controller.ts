import { Request, Response } from "express";
import { candleCustomizationService } from "../services";
import { CandleCustomizationSchema } from "../schemas";

class CustomizationController {
  public async create(req: Request, res: Response) {
    try {
      const validatedData = CandleCustomizationSchema.parse(req.body);
      const result = await candleCustomizationService.create(validatedData);
      res.status(201).json(result);
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
      const customization = await candleCustomizationService.findById(id);
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
      const customizations = await candleCustomizationService.findAll();
      res.json(customizations);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const validatedData = CandleCustomizationSchema.parse(req.body);
      const customization = await candleCustomizationService.update(id, validatedData);
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
      const customization = await candleCustomizationService.delete(id);
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

export const customizationController = new CustomizationController();
